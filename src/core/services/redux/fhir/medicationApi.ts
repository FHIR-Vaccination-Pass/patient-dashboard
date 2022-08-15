import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bundle, Medication } from 'fhir/r4';
import { settings } from '../../../../settings';
import { MedicationMapper } from '../../../models';
import { NestedCartesian, storeIdRecursive } from './utils';

type TResource = Medication;
const TMapper = MedicationMapper;
interface GetArgs {
  _id?: string;
  code?: string;
  manufacturer?: string;
  form?: string;
}
interface GetResponseTopLevel {
  ids: string[];

  byCode: Record<string, string[]>;
  byForm: Record<string, string[]>;
  byManufacturer: Record<string, string[]>;
  byTargetDisease: Record<string, string[]>;
}
type GetResponse = {
  entities: Record<string, TResource>;
} & NestedCartesian<GetResponseTopLevel>;
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
    get: build.query<GetResponse, GetArgs>({
      query: (args) => ({
        url: resourcePath,
        params: {
          ...args,
          _profile: `${settings.fhir.profileBaseUrl}/vp-medication`,
        },
      }),
      transformResponse: ({ entry }: Bundle) => {
        const resources = entry!.map(({ resource }) => resource! as TResource);

        const response: GetResponse = {
          ids: [],
          entities: {},

          byCode: {},
          byForm: {},
          byManufacturer: {},
          byTargetDisease: {},
        };

        for (const resource of resources) {
          const { id, code, form, manufacturerId, targetDiseaseIds } =
            TMapper.fromResource(resource);

          response.ids.push(id);
          response.entities[id] = resource;

          storeIdRecursive(response, id, [
            ['byCode', code.coding],
            ['byForm', form.coding],
            ['byManufacturer', manufacturerId],
            ...targetDiseaseIds.map(
              (targetDisease) =>
                ['byTargetDisease', targetDisease] as [
                  'byTargetDisease',
                  string
                ]
            ),
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
