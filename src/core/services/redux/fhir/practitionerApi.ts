import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Practitioner } from 'fhir/r4';
import { settings } from '../../../../settings';

type TResource = Practitioner;
interface GetArgs {
  _id?: string;
  name?: string;
}
const resourceName = 'Practitioner' as const;
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
    get: build.query<TResource[], GetArgs>({
      query: (args) => ({
        url: resourcePath,
        params: {
          ...args,
          _profile: `${settings.fhir.profileBaseUrl}/vp-practitioner`,
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
