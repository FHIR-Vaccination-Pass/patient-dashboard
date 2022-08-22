import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Organization } from 'fhir/r4';
import { settings } from '../../../../settings';
import { OrganizationMapper } from '../../../models';
import { GetResponse } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Organization;
export const TMapper = OrganizationMapper;
export interface GetArgs {
  _id?: string;
  name?: string;
}
export type GetResponseGroups = never;
const resourceName: ResourceName = 'Organization';
const resourcePath = '/Organization' as const;

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-organization`,
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
