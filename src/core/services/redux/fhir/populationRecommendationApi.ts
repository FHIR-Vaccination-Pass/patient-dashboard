import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';
import { PopulationRecommendationMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Basic;
export const TMapper = PopulationRecommendationMapper;
export interface GetArgs {
  _id?: string;
}
export type GetResponseGroups = 'byCountry' | 'byState' | 'byDisease';
const resourceName: ResourceName = 'Basic';
const resourcePath = '/Basic' as const;

export const populationRecommendationApi = createApi({
  reducerPath: 'populationRecommendationApi',
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
          code: 'PopulationRecommendation',
          _profile: `${settings.fhir.profileBaseUrl}/vp-population-recommendation`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byCountry: {},
          byState: {},
          byDisease: {},
        };

        for (const resource of resources) {
          const { id, locations, diseaseId } = TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ...locations.flatMap((l): ['byCountry' | 'byState', string][] =>
              l.state
                ? [
                    ['byCountry', l.country],
                    ['byState', l.state],
                  ]
                : [['byCountry', l.country]]
            ),
            ['byDisease', diseaseId],
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
