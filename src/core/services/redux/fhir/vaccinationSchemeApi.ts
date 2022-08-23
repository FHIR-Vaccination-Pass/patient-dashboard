import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';
import { VaccinationSchemeMapper } from '../../../models';
import { storeIdRecursive, GetResponse } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Basic;
export const TMapper = VaccinationSchemeMapper;
export interface GetArgs {
  _id?: string;
  subject?: string;
}
export type GetResponseGroups = 'byType' | 'byIsPreferred' | 'byMedication';
const resourceName: ResourceName = 'Basic';
const resourcePath = '/Basic' as const;

export const vaccinationSchemeApi = createApi({
  reducerPath: 'vaccinationSchemeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: settings.fhir.baseUrl,
    prepareHeaders: (headers) => {
      // TODO: add OIDC auth for Keycloak
      headers.set('Authorization', `Basic ${btoa('fhiruser:supersecret')}`);
      return headers;
    },
  }),
  tagTypes: [resourceName],
  endpoints: (build) => ({
    get: build.query<GetResponse<TResource, GetResponseGroups>, GetArgs>({
      query: (args) => ({
        url: resourcePath,
        params: {
          ...args,
          code: 'VaccinationScheme',
          _profile: `${settings.fhir.profileBaseUrl}/vp-vaccination-scheme`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources =
          entry?.map(({ resource }) => resource! as TResource) ?? [];

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byType: {},
          byIsPreferred: {},
          byMedication: {},
        };

        for (const resource of resources) {
          const {
            id,
            type,
            isPreferred: isPreferredBoolean,
            medicationId,
          } = TMapper.fromResource(resource);
          const isPreferred = String(isPreferredBoolean);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byType', type],
            ['byIsPreferred', isPreferred],
            ['byMedication', medicationId],
          ]);
        }

        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: resourceName,
                id,
              })),
              { type: resourceName, id: 'LIST' },
            ]
          : [{ type: resourceName, id: 'LIST' }],
    }),
    getById: build.query<TResource, string>({
      query: (id) => ({ url: `${resourcePath}/${id}` }),
      providesTags: (result) =>
        result ? [{ type: resourceName, id: result.id }] : [],
    }),
    put: build.mutation<void, TResource>({
      query: (resource) => ({
        url: `${resourcePath}/${resource.id}`,
        method: 'PUT',
        body: resource,
      }),
      invalidatesTags: (_result, _error, resource) => [
        { type: resourceName, id: resource.id },
      ],
      onQueryStarted: (resource) => {
        addOwnUpdate({ type: resourceName, id: resource.id });
      },
    }),
    post: build.mutation<void, TResource>({
      query: (resource) => ({
        url: resourcePath,
        method: 'POST',
        body: resource,
      }),
      invalidatesTags: () => [{ type: resourceName, id: 'LIST' }],
      onQueryStarted: () => {
        addOwnUpdate({ type: resourceName, id: 'LIST' });
      },
    }),
    deleteById: build.mutation<void, string>({
      query: (id) => ({
        url: `${resourcePath}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: resourceName, id }],
      onQueryStarted: (id) => {
        addOwnUpdate({ type: resourceName, id });
      },
    }),
  }),
});
