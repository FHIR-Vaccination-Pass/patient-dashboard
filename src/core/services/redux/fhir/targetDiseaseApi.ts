import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';

type TResource = Basic;
interface GetArgs {
  _id?: string;
}
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
    get: build.query<TResource[], GetArgs>({
      query: () => ({
        url: resourcePath,
        params: {
          code: resourceName,
          _profile: `${settings.fhir.profileBaseUrl}/vp-target-disease`,
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
