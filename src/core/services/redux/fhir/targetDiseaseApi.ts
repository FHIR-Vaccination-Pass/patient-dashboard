import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle } from 'fhir/r4';
import { settings } from '../../../../settings';

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
  tagTypes: ['TargetDisease'],
  endpoints: (build) => ({
    getTargetDiseases: build.query<Basic[], void>({
      query: () => ({
        url: '/Basic',
        params: {
          code: 'TargetDisease',
          _profile: `${settings.fhir.profileBaseUrl}/vp-target-disease`,
        },
      }),
      transformResponse: ({ entry }: Bundle) =>
        entry!.map(({ resource }) => resource! as Basic),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'TargetDisease' as const,
                id,
              })),
              { type: 'TargetDisease', id: 'LIST' },
            ]
          : [{ type: 'TargetDisease', id: 'LIST' }],
    }),
    getTargetDiseaseById: build.query<Basic, string>({
      query: (id) => ({ url: `/Basic/${id}` }),
      providesTags: (result) =>
        result ? [{ type: 'TargetDisease', id: result.id }] : [],
    }),
  }),
});
