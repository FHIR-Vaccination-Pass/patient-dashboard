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
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

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

  static fromResource<T extends FHIRImmunization | undefined>(
    resource: T
  ): T extends FHIRImmunization ? ImmunizationMapper : undefined;

  static fromResource(
    resource: FHIRImmunization | undefined
  ): ImmunizationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }

    return new ImmunizationMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRImmunization | undefined
  ): (id: string | undefined) => ImmunizationMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel({
    id,
    status,
    vaccineCode,
    occurrenceTime,
    lotNumber,
    patientId,
    performerId,
    vaccinationDoseId,
  }: Immunization): ImmunizationMapper {
    return new ImmunizationMapper({
      id,
      resourceType: 'Immunization',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-immunization`] },
      status,
      vaccineCode: {
        coding: [
          { system: vaccineCode.coding.system, code: vaccineCode.coding.code },
        ],
      },
      occurrenceDateTime: dayjs(occurrenceTime).format('YYYY-MM-DD'),
      lotNumber,
      patient: { reference: `Patient/${patientId}` },
      performer: [{ actor: { reference: `Practitioner/${performerId}` } }],
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-administered-vaccination-dose`,
          valueReference: { reference: `Basic/${vaccinationDoseId}` },
        },
      ],
    });
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

  set status(status: ImmunizationStatus) {
    this._raw.status = status;
  }

  withStatus(status: ImmunizationStatus): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.status = status;
    return newImmunization;
  }

  get _vaccineCodeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `vaccineCode.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get vaccineCode(): CodeableConcept {
    return {
      coding: {
        code: this._vaccineCodeCoding.code!,
        system: this._vaccineCodeCoding.system!,
      },
    };
  }

  set vaccineCode(vaccineCode: CodeableConcept) {
    this._vaccineCodeCoding.code = vaccineCode.coding.code;
    this._vaccineCodeCoding.system = vaccineCode.coding.system;
  }

  withVaccineCode(vaccineCode: CodeableConcept): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.vaccineCode = vaccineCode;
    return newImmunization;
  }

  get occurrenceTime(): Date {
    return new Date(this._raw.occurrenceDateTime!);
  }

  set occurrenceTime(occurrenceTime: Date) {
    this._raw.occurrenceDateTime = dayjs(occurrenceTime).format('YYYY-MM-DD');
  }

  withOccurrenceTime(occurrenceTime: Date): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.occurrenceTime = occurrenceTime;
    return newImmunization;
  }

  get lotNumber(): string {
    return this._raw.lotNumber!;
  }

  set lotNumber(lotNumber: string) {
    this._raw.lotNumber = lotNumber;
  }

  withLotNumber(lotNumber: string): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.lotNumber = lotNumber;
    return newImmunization;
  }

  get patientId(): string {
    const referenceParts = this._raw.patient.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set patientId(patientId: string) {
    this._raw.patient.reference = `Patient/${patientId}`;
  }

  withPatientId(patientId: string): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.patientId = patientId;
    return newImmunization;
  }

  get _performerReference(): FHIRReference {
    return fhirpath.evaluate(
      this._raw,
      `performer.actor`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRReference;
  }

  get performerId(): string {
    const referenceParts = this._performerReference.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set performerId(performerId: string) {
    this._performerReference.reference = `Practitioner/${performerId}`;
  }

  withPerformerId(performerId: string): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.performerId = performerId;
    return newImmunization;
  }

  get _administeredVaccinationDoseExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-administered-vaccination-dose')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get vaccinationDoseId(): string {
    const referenceParts =
      this._administeredVaccinationDoseExtension.valueReference!.reference!.split(
        '/'
      );
    return referenceParts[referenceParts.length - 1];
  }

  set vaccinationDoseId(vaccinationDoseId: string) {
    this._administeredVaccinationDoseExtension.valueReference!.reference = `Basic/${vaccinationDoseId}`;
  }

  withVaccinationDoseId(vaccinationDoseId: string): ImmunizationMapper {
    const newImmunization = cloneDeep(this);
    newImmunization.vaccinationDoseId = vaccinationDoseId;
    return newImmunization;
  }
}
