import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, ImmunizationRecommendation } from 'fhir/r4';
import { settings } from '../../../../settings';

type TResource = ImmunizationRecommendation;
interface GetArgs {
  _id?: string;
  patient?: string;
  'vaccine-type'?: string;
  'target-disease'?: string;
}
const resourceName = 'ImmunizationRecommendation' as const;
const resourcePath = '/ImmunizationRecommendation' as const;

export const immunizationRecommendationApi = createApi({
  reducerPath: 'immunizationRecommendationApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-immunization-recommendation`,
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
