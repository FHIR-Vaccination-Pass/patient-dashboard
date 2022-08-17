import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Immunization } from 'fhir/r4';
import { settings } from '../../../../settings';
import { ImmunizationMapper } from '../../../models';
import { GetResponse, storeIdRecursive } from './utils';

type TResource = Immunization;
const TMapper = ImmunizationMapper;
interface GetArgs {
  _id?: string;
  status?: string;
  'vaccine-code'?: string;
  patient?: string;
  date?: string;
  'lot-number'?: string;
  performer?: string;
}
type GetResponseGroups =
  | 'byStatus'
  | 'byVaccineCode'
  | 'byLotNumber'
  | 'byPatient'
  | 'byPerformer'
  | 'byVaccinationDose';
const resourceName = 'Immunization' as const;
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
  }),
});
