import { CodeableConcept } from './CodeableConcept';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  Immunization as FHIRImmunization,
  Reference as FHIRReference,
} from 'fhir/r4';
import { settings } from '../../settings';

export type ImmunizationStatus = 'completed' | 'entered-in-error' | 'not-done';

export interface Immunization {
  id: string;
  status: ImmunizationStatus;
  vaccineCode: CodeableConcept;
  occurrenceTime: Date;
  lotNumber: string;
  patientId: string;
  performerId: string;
  vaccinationDoseId: string;
}

export class ImmunizationMapper implements Immunization {
  private _raw: FHIRImmunization;

  constructor(resource: FHIRImmunization) {
    this._raw = resource;
  }

  static fromResource(resource: FHIRImmunization) {
    return new ImmunizationMapper(resource);
  }

  toResource(): FHIRImmunization {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get status(): ImmunizationStatus {
    return this._raw.status;
  }

  get vaccineCode(): CodeableConcept {
    const vaccineCodeCoding = fhirpath.evaluate(
      this._raw,
      `vaccineCode.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return { id: '', coding: vaccineCodeCoding.code!, text: '' };
  }

  get occurrenceTime(): Date {
    return new Date(this._raw.occurrenceDateTime!);
  }

  get lotNumber(): string {
    return this._raw.lotNumber!;
  }

  get patientId(): string {
    const referenceParts = this._raw.patient.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  get performerId(): string {
    const performerReference = fhirpath.evaluate(
      this._raw,
      `performer.actor`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRReference;

    const referenceParts = performerReference.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  get vaccinationDoseId(): string {
    const administeredVaccinationDoseExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-administered-vaccination-dose')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const referenceParts =
      administeredVaccinationDoseExtension.valueReference!.reference!.split(
        '/'
      );
    return referenceParts[referenceParts.length - 1];
  }
}
