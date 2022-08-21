import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Patient } from 'fhir/r4';
import { settings } from '../../../../settings';
import { PatientMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Patient;
export const TMapper = PatientMapper;

export interface GetArgs {
  _id?: string;
  active?: string;
  name?: string;
  gender?: string;
  birthdate?: string;
  deceased?: string;
  address?: string;
}

export type GetResponseGroups =
  | 'byActive'
  | 'byGender'
  | 'byDeceased'
  | 'byIsPregnant'
  | 'byKeycloakUsername';
const resourceName: ResourceName = 'Patient';
const resourcePath = '/Patient' as const;

export const patientApi = createApi({
  reducerPath: 'patientApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-patient`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byActive: {},
          byGender: {},
          byDeceased: {},
          byIsPregnant: {},
          byKeycloakUsername: {},
        };

        for (const resource of resources) {
          const { id, active, gender, deceased, isPregnant, keycloakUsername } =
            TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byActive', String(active)],
            ['byGender', gender],
            ['byDeceased', String(deceased)],
            ['byIsPregnant', String(isPregnant)],
            ['byKeycloakUsername', keycloakUsername],
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
  }),
});
