import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';
import { DiseaseMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';

export type TResource = Basic;
export const TMapper = DiseaseMapper;
export interface GetArgs {
  _id?: string;
}
export type GetResponseGroups = 'byCode';
const resourceName = 'TargetDisease' as const;
const resourcePath = '/Basic' as const;

export const targetDiseaseApi = createApi({
  reducerPath: 'targetDiseaseApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-target-disease`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byCode: {},
        };

        for (const resource of resources) {
          const { id, code } = TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [['byCode', code.coding.code]]);
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
