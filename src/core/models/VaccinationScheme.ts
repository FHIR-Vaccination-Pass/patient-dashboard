import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

export type VaccinationSchemeType = 'standard' | 'fast' | 'booster';

export interface VaccinationScheme {
  id: string;
  name: string;
  type: VaccinationSchemeType;
  isPreferred: boolean;
  ageStart?: number;
  ageEnd?: number;
  medicationId: string;
}

export class VaccinationSchemeMapper implements VaccinationScheme {
  private _raw: FHIRBasic;
  private _vaccinationSchemeExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._vaccinationSchemeExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vaccination-scheme-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic ? VaccinationSchemeMapper : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): VaccinationSchemeMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new VaccinationSchemeMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (id: string | undefined) => VaccinationSchemeMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel({
    id,
    name,
    type,
    isPreferred,
    ageStart,
    ageEnd,
    medicationId,
  }: VaccinationScheme): VaccinationSchemeMapper {
    return new VaccinationSchemeMapper({
      id,
      resourceType: 'Basic',
      meta: {
        profile: [`${settings.fhir.profileBaseUrl}/vp-vaccination-scheme`],
      },
      code: { coding: [{ code: 'VaccinationScheme' }] },
      subject: { reference: `Medication/${medicationId}` },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-vaccination-scheme-extension`,
          extension: [
            {
              url: 'name',
              valueString: name,
            },
            {
              url: 'type',
              valueString: type,
            },
            {
              url: 'isPreferred',
              valueBoolean: isPreferred,
            },
            ...(ageStart
              ? [
                  {
                    url: 'ageStart',
                    valueAge: {
                      system: 'http://unitsofmeasure.org',
                      value: ageStart,
                      code: 'a',
                    },
                  },
                ]
              : []),
            ...(ageEnd
              ? [
                  {
                    url: 'ageEnd',
                    valueAge: {
                      system: 'http://unitsofmeasure.org',
                      value: ageEnd,
                      code: 'a',
                    },
                  },
                ]
              : []),
          ],
        },
      ],
    });
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get _nameExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get name(): string {
    return this._nameExtension.valueString!;
  }

  set name(name: string) {
    this._nameExtension.valueString = name;
  }

  withName(name: string): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.name = name;
    return newVaccinationScheme;
  }

  get _typeExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'type')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get type(): VaccinationSchemeType {
    return this._typeExtension.valueString! as VaccinationSchemeType;
  }

  set type(type: VaccinationSchemeType) {
    this._typeExtension.valueString = type;
  }

  withType(type: VaccinationSchemeType): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.type = type;
    return newVaccinationScheme;
  }

  get _isPreferredExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'isPreferred')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get isPreferred(): boolean {
    return this._isPreferredExtension.valueBoolean!;
  }

  set isPreferred(isPreferred: boolean) {
    this._isPreferredExtension.valueBoolean = isPreferred;
  }

  withIsPreferred(isPreferred: boolean): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.isPreferred = isPreferred;
    return newVaccinationScheme;
  }

  get _ageStartExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'ageStart')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get ageStart(): number | undefined {
    return this._ageStartExtension?.valueAge?.value;
  }

  set ageStart(ageStart: number | undefined) {
    if (ageStart === undefined) {
      this._vaccinationSchemeExtension.extension =
        this._vaccinationSchemeExtension.extension!.filter(
          (ex) => ex !== this._ageStartExtension
        );
    } else if (this._ageStartExtension === undefined) {
      this._vaccinationSchemeExtension.extension!.push({
        url: 'ageStart',
        valueAge: {
          system: 'http://unitsofmeasure.org',
          value: ageStart,
          code: 'a',
        },
      });
    } else {
      this._ageStartExtension.valueAge!.value = ageStart;
    }
  }

  withAgeStart(ageStart: number | undefined): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.ageStart = ageStart;
    return newVaccinationScheme;
  }

  get _ageEndExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'ageEnd')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get ageEnd(): number | undefined {
    return this._ageEndExtension?.valueAge?.value;
  }

  set ageEnd(ageEnd: number | undefined) {
    if (ageEnd === undefined) {
      this._vaccinationSchemeExtension.extension =
        this._vaccinationSchemeExtension.extension!.filter(
          (ex) => ex !== this._ageEndExtension
        );
    } else if (this._ageEndExtension === undefined) {
      this._vaccinationSchemeExtension.extension!.push({
        url: 'ageEnd',
        valueAge: {
          system: 'http://unitsofmeasure.org',
          value: ageEnd,
          code: 'a',
        },
      });
    } else {
      this._ageEndExtension.valueAge!.value = ageEnd;
    }
  }

  withAgeEnd(ageEnd: number | undefined): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.ageEnd = ageEnd;
    return newVaccinationScheme;
  }

  get medicationId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set medicationId(medicationId: string) {
    this._raw.subject!.reference = `Medication/${medicationId}`;
  }

  withMedicationId(medicationId: string): VaccinationSchemeMapper {
    const newVaccinationScheme = cloneDeep(this);
    newVaccinationScheme.medicationId = medicationId;
    return newVaccinationScheme;
  }
}
