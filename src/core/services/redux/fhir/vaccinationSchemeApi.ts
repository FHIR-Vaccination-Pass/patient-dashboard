import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';
import { VaccinationSchemeMapper } from '../../../models';
import { storeIdRecursive, GetResponse } from './utils';

export type TResource = Basic;
export const TMapper = VaccinationSchemeMapper;
export interface GetArgs {
  _id?: string;
  subject?: string;
}
export type GetResponseGroups = 'byType' | 'byIsPreferred' | 'byMedication';
const resourceName = 'VaccinationScheme' as const;
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
      query: () => ({
        url: resourcePath,
        params: {
          code: resourceName,
          _profile: `${settings.fhir.profileBaseUrl}/vp-vaccination-scheme`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

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
  }),
});
