import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, ImmunizationRecommendation } from 'fhir/r4';
import { settings } from '../../../../settings';
import { ImmunizationRecommendationMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = ImmunizationRecommendation;
export const TMapper = ImmunizationRecommendationMapper;
export interface GetArgs {
  _id?: string;
  patient?: string;
  'vaccine-type'?: string;
  'target-disease'?: string;
}
export type GetResponseGroups =
  | 'byForecastStatus'
  | 'byVaccineCode'
  | 'byTargetDisease'
  | 'byIsDeactivated'
  | 'bySupportingImmunization'
  | 'byFulfillingImmunization'
  | 'byPatient'
  | 'byPopulationRecommendation'
  | 'byVaccinationDose';
const resourceName: ResourceName = 'ImmunizationRecommendation';
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
    get: build.query<GetResponse<TResource, GetResponseGroups>, GetArgs>({
      query: (args) => ({
        url: resourcePath,
        params: {
          ...args,
          _profile: `${settings.fhir.profileBaseUrl}/vp-immunization-recommendation`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byForecastStatus: {},
          byVaccineCode: {},
          byTargetDisease: {},
          byIsDeactivated: {},
          bySupportingImmunization: {},
          byFulfillingImmunization: {},
          byPatient: {},
          byPopulationRecommendation: {},
          byVaccinationDose: {},
        };

        for (const resource of resources) {
          const {
            id,
            forecastStatus,
            vaccineCode,
            targetDisease,
            isDeactivated,
            supportingImmunizationIds,
            fulfillingImmunizationIds,
            patientId,
            populationRecommendationId,
            vaccinationDoseId,
          } = TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byForecastStatus', forecastStatus.coding.code],
            ['byVaccineCode', vaccineCode.coding.code],
            ['byTargetDisease', targetDisease.coding.code],
            ['byIsDeactivated', String(isDeactivated)],
            ...supportingImmunizationIds.map(
              (sId): ['bySupportingImmunization', string] => [
                'bySupportingImmunization',
                sId,
              ]
            ),
            ...fulfillingImmunizationIds.map(
              (fId): ['byFulfillingImmunization', string] => [
                'byFulfillingImmunization',
                fId,
              ]
            ),
            ['byPatient', patientId],
            ['byPopulationRecommendation', populationRecommendationId],
            ['byVaccinationDose', vaccinationDoseId],
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
  }),
});
