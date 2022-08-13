import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Medication } from 'fhir/r4';
import { settings } from '../../../../settings';

type TResource = Medication;
interface GetArgs {
  _id?: string;
  code?: string;
  manufacturer?: string;
  form?: string;
}
const resourceName = 'Medication' as const;
const resourcePath = '/Medication' as const;

export const medicationApi = createApi({
  reducerPath: 'medicationApi',
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
    get: build.query<TResource[], GetArgs>({
      query: (args) => ({
        url: resourcePath,
        params: {
          ...args,
          _profile: `${settings.fhir.profileBaseUrl}/vp-medication`,
        },
      }),
      transformResponse: ({ entry }: Bundle) =>
        entry!.map(({ resource }) => resource! as TResource),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
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
