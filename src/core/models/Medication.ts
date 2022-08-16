import { CodeableConcept } from './CodeableConcept';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  Medication as FHIRMedication,
} from 'fhir/r4';
import { settings } from '../../settings';

export interface Medication {
  id: string;
  code: CodeableConcept;
  form: CodeableConcept;
  manufacturerId: string; // id refers to an Organization id
  tradeName: string;
  targetDiseaseIds: string[];
}

export class MedicationMapper implements Medication {
  private _raw: FHIRMedication;

  constructor(resource: FHIRMedication) {
    this._raw = resource;
  }

  static fromResource<T extends FHIRMedication | undefined>(
    resource: T
  ): T extends FHIRMedication ? MedicationMapper : undefined;

  static fromResource(
    resource: FHIRMedication | undefined
  ): MedicationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new MedicationMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRMedication | undefined
  ): (id: string | undefined) => MedicationMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIRMedication {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get code(): CodeableConcept {
    const codeCoding = fhirpath.evaluate(
      this._raw,
      `code.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return {
      coding: {
        code: codeCoding.code!,
        system: codeCoding.system!,
      },
    };
  }

  get form(): CodeableConcept {
    const formCoding = fhirpath.evaluate(
      this._raw,
      `form.coding.where(system = 'http://snomed.info/sct')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return {
      coding: {
        code: formCoding.code!,
        system: formCoding.system!,
      },
    };
  }

  get manufacturerId(): string {
    const referenceParts = this._raw.manufacturer!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  get tradeName(): string {
    const tradeNameExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-medication-trade-name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return tradeNameExtension.valueString!;
  }

  get targetDiseaseIds(): string[] {
    const targetDiseaseCodings = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-medication-target-disease')` +
        `.value` +
        `.coding` +
        `.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRCoding[];

    return targetDiseaseCodings.map((coding) => coding.code!);
  }
}
