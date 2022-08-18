import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';
import { VaccinationDoseMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';
import { ResourceName } from './types';

export type TResource = Basic;
export const TMapper = VaccinationDoseMapper;
export interface GetArgs {
  _id?: string;
  subject?: string;
}
export type GetResponseGroups =
  | 'byType'
  | 'byIsProtected'
  | 'byVaccinationScheme';
const resourceName: ResourceName = 'Basic';
const resourcePath = '/Basic' as const;

export const vaccinationDoseApi = createApi({
  reducerPath: 'vaccinationDoseApi',
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
          code: 'VaccinationDose',
          _profile: `${settings.fhir.profileBaseUrl}/vp-vaccination-dose`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byType: {},
          byIsProtected: {},
          byVaccinationScheme: {},
        };

        for (const resource of resources) {
          const { id, type, isProtected, vaccinationSchemeId } =
            TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byType', type],
            ['byIsProtected', String(isProtected)],
            ['byVaccinationScheme', vaccinationSchemeId],
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
