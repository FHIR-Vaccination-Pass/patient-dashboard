import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Basic, Bundle, Coding, Extension } from 'fhir/r4';
import { Disease } from '../../../models/Disease';
import { CodeableConcept } from '../../../models/CodeableConcept';
import * as fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../../../settings';

class TargetDiseaseMapped implements Disease {
  private _raw: Basic;

  constructor(raw: Basic) {
    this._raw = raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get code(): CodeableConcept {
    const coding = fhirpath.evaluate(
      this._raw,
      `extension('${settings.fhir.profileBaseUrl}/vp-target-disease-extension')` +
        `.extension('code')` +
        `.value` +
        `.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as Coding;

    return { id: '', coding: coding.code!, text: '' };
  }

  get name(): string {
    const nameExtension = fhirpath.evaluate(
      this._raw,
      `extension('${settings.fhir.profileBaseUrl}/vp-target-disease-extension')` +
        `.extension('name')`,
      undefined,
      fhirpath_r4_model
    )[0] as Extension;

    return nameExtension.valueString!;
  }

  get description(): string {
    return fhirpath.evaluate(
      this._raw,
      `extension('${settings.fhir.profileBaseUrl}/vp-target-disease-extension')` +
        `.extension('description').value`,
      undefined,
      fhirpath_r4_model
    )[0] as string;
  }

  get populationRecommendationId(): string {
    // TODO: get rid of this
    return '';
  }

  get vaccineIds(): string[] {
    // TODO: get rid of this
    return [];
  }
}

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
    getTargetDiseases: build.query<TargetDiseaseMapped[], void>({
      query: () => ({
        url: '/Basic',
        params: {
          code: 'TargetDisease',
          _profile: `${settings.fhir.profileBaseUrl}/vp-target-disease`,
        },
      }),
      transformResponse: ({ entry }: Bundle) =>
        entry!.map(
          ({ resource }) => new TargetDiseaseMapped(resource! as Basic)
        ),
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
    getTargetDiseaseById: build.query<TargetDiseaseMapped, string>({
      query: (id) => ({ url: `/Basic/${id}` }),
      transformResponse: (response: Basic) => new TargetDiseaseMapped(response),
      providesTags: (result) =>
        result ? [{ type: 'TargetDisease', id: result.id }] : [],
    }),
  }),
});
