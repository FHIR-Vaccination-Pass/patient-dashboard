import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Practitioner } from 'fhir/r4';
import { settings } from '../../../../settings';
import { PractitionerMapper } from '../../../models';
import { GetResponse } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Practitioner;
export const TMapper = PractitionerMapper;
export interface GetArgs {
  _id?: string;
  name?: string;
}
export type GetResponseGroups = never;
const resourceName: ResourceName = 'Practitioner';
const resourcePath = '/Practitioner' as const;

export const practitionerApi = createApi({
  reducerPath: 'practitionerApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-practitioner`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},
        };

        for (const resource of resources) {
          const { id } = TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;
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
  }),
});
