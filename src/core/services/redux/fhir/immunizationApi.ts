import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Immunization } from 'fhir/r4';
import { settings } from '../../../../settings';
import { ImmunizationMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';
import { ResourceName } from './types';
import { addOwnUpdate } from './notificationWebsocket';

export type TResource = Immunization;
export const TMapper = ImmunizationMapper;
export interface GetArgs {
  _id?: string;
  status?: string;
  'vaccine-code'?: string;
  patient?: string;
  date?: string;
  'lot-number'?: string;
  performer?: string;
}
export type GetResponseGroups =
  | 'byStatus'
  | 'byVaccineCode'
  | 'byLotNumber'
  | 'byPatient'
  | 'byPerformer'
  | 'byVaccinationDose';
const resourceName: ResourceName = 'Immunization';
const resourcePath = '/Immunization' as const;

export const immunizationApi = createApi({
  reducerPath: 'immunizationApi',
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
          _profile: `${settings.fhir.profileBaseUrl}/vp-immunization`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse<TResource, GetResponseGroups> = {
          ids: [],
          entities: {},

          byStatus: {},
          byVaccineCode: {},
          byLotNumber: {},
          byPatient: {},
          byPerformer: {},
          byVaccinationDose: {},
        };

        for (const resource of resources) {
          const {
            id,
            status,
            vaccineCode,
            lotNumber,
            patientId,
            performerId,
            vaccinationDoseId,
          } = TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byStatus', status],
            ['byVaccineCode', vaccineCode.coding.code],
            ['byLotNumber', lotNumber],
            ['byPatient', patientId],
            ['byPerformer', performerId],
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
