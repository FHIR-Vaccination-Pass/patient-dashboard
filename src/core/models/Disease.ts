import { CodeableConcept } from './CodeableConcept';
import { Basic, Coding, Extension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

import { settings } from '../../settings';

export interface Disease {
  id: string;
  code: CodeableConcept;
  name: string;
  description: string;
  populationRecommendationId: string;
  // Medication ids
  vaccineIds: string[];
}

export class DiseaseMapper implements Disease {
  private _raw: Basic;

  constructor(resource: Basic) {
    this._raw = resource;
  }

  static fromResource(resource: Basic) {
    return new DiseaseMapper(resource);
  }

  toResource(): Basic {
    return this._raw;
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
