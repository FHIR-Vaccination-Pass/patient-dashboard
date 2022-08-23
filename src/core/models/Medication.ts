import { CodeableConcept } from './CodeableConcept';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  Medication as FHIRMedication,
} from 'fhir/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export interface Medication {
  id: string;
  code: CodeableConcept;
  form: CodeableConcept;
  manufacturerId: string; // id refers to an Organization id
  tradeName: string;
  targetDiseaseCodes: string[];
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

  static fromModel({
    id,
    code,
    form,
    manufacturerId,
    tradeName,
    targetDiseaseCodes,
  }: Medication): MedicationMapper {
    return new MedicationMapper({
      id: id || uuidv4(),
      resourceType: 'Medication',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-medication`] },
      code: {
        coding: [{ system: code.coding.system, code: code.coding.code }],
      },
      form: {
        coding: [{ system: form.coding.system, code: form.coding.code }],
      },
      manufacturer: { reference: `Organization/${manufacturerId}` },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-medication-trade-name`,
          valueString: tradeName,
        },
        ...targetDiseaseCodes.map((tdCode) => ({
          url: `${settings.fhir.profileBaseUrl}/vp-medication-target-disease`,
          valueCodeableConcept: {
            coding: [
              { system: 'http://hl7.org/fhir/sid/icd-10', code: tdCode },
            ],
          },
        })),
      ],
    });
  }

  toResource(): FHIRMedication {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get _codeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `code.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get code(): CodeableConcept {
    return {
      coding: {
        code: this._codeCoding.code!,
        system: this._codeCoding.system!,
      },
    };
  }

  set code(code: CodeableConcept) {
    this._codeCoding.code = code.coding.code;
    this._codeCoding.system = code.coding.system;
  }

  withCode(code: CodeableConcept): MedicationMapper {
    const newMedication = cloneDeep(this);
    newMedication.code = code;
    return newMedication;
  }

  get _formCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `form.coding.where(system = 'http://snomed.info/sct')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get form(): CodeableConcept {
    return {
      coding: {
        code: this._formCoding.code!,
        system: this._formCoding.system!,
      },
    };
  }

  set form(form: CodeableConcept) {
    this._formCoding.code = form.coding.code;
    this._formCoding.system = form.coding.system;
  }

  withForm(form: CodeableConcept): MedicationMapper {
    const newMedication = cloneDeep(this);
    newMedication.form = form;
    return newMedication;
  }

  get manufacturerId(): string {
    const referenceParts = this._raw.manufacturer!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set manufacturerId(manufacturerId: string) {
    this._raw.manufacturer!.reference = `Organization/${manufacturerId}`;
  }

  withManufacturerId(manufacturerId: string): MedicationMapper {
    const newMedication = cloneDeep(this);
    newMedication.manufacturerId = manufacturerId;
    return newMedication;
  }

  get _tradeNameExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-medication-trade-name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get tradeName(): string {
    return this._tradeNameExtension.valueString!;
  }

  set tradeName(tradeName: string) {
    this._tradeNameExtension.valueString = tradeName;
  }

  withTradeName(tradeName: string): MedicationMapper {
    const newMedication = cloneDeep(this);
    newMedication.tradeName = tradeName;
    return newMedication;
  }

  get _targetDiseaseExtensions(): FHIRExtension[] {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-medication-target-disease')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
  }

  get targetDiseaseCodes(): string[] {
    return this._targetDiseaseExtensions.map(
      (ex) => ex.valueCodeableConcept!.coding![0].code!
    );
  }

  set targetDiseaseCodes(targetDiseaseCodes: string[]) {
    this._raw.extension = this._raw
      .extension!.filter((ex) => !this._targetDiseaseExtensions.includes(ex))
      .concat(
        targetDiseaseCodes.map((tdCode) => ({
          url: `${settings.fhir.profileBaseUrl}/vp-medication-target-disease`,
          valueCodeableConcept: {
            coding: [
              { system: 'http://hl7.org/fhir/sid/icd-10', code: tdCode },
            ],
          },
        }))
      );
  }

  withTargetDiseaseCodes(targetDiseaseCodes: string[]): MedicationMapper {
    const newMedication = cloneDeep(this);
    newMedication.targetDiseaseCodes = targetDiseaseCodes;
    return newMedication;
  }
}
