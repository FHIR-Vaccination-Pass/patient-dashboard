import { CodeableConcept } from './CodeableConcept';
import {
  Basic as FHIRBasic,
  Coding as FHIRCoding,
  Extension as FHIRExtension,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

import { settings } from '../../settings';

export interface Disease {
  id: string;
  code: CodeableConcept;
  name: string;
  description: string;
}

export class DiseaseMapper implements Disease {
  private _raw: FHIRBasic;
  private _targetDiseaseExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._targetDiseaseExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-target-disease-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource(resource: FHIRBasic) {
    return new DiseaseMapper(resource);
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get code(): CodeableConcept {
    const coding = fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'code').value.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return { id: '', coding: coding.code!, text: '' };
  }

  get name(): string {
    const nameExtension = fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return nameExtension.valueString!;
  }

  get description(): string {
    return fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'description').value`,
      undefined,
      fhirpath_r4_model
    )[0] as string;
  }
}
