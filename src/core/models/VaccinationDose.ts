import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

// normalize to days
export type AgeUnit = 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
const TIMEFRAME_VALUE_FACTORS: Record<AgeUnit, number> = {
  min: 1 / (24 * 60),
  h: 1 / 24,
  d: 1,
  wk: 7,
  mo: 30,
  a: 365,
};

export interface VaccinationDose {
  id: string;
  doseQuantity: number;
  isProtected: boolean;
  notes: string;
  vaccinationSchemeId: string;
}

export interface VaccinationDoseSingle extends VaccinationDose {
  type: 'single';
  numberInScheme: number;
  timeframeStart?: number;
  timeframeEnd?: number;
}

export interface VaccinationDoseRepeating extends VaccinationDose {
  type: 'repeating';
  interval: { value: number; code: AgeUnit };
}

export class VaccinationDoseMapper implements VaccinationDose {
  private _raw: FHIRBasic;
  private _vaccinationDoseBaseExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._vaccinationDoseBaseExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vaccination-dose-base-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic
    ? VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper
    : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }

    const vaccinationDoseSingleExtension = fhirpath.evaluate(
      resource,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vaccination-dose-single-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
    if (vaccinationDoseSingleExtension !== undefined) {
      return new VaccinationDoseSingleMapper(
        resource,
        vaccinationDoseSingleExtension
      );
    }

    const vaccinationDoseRepeatingExtension = fhirpath.evaluate(
      resource,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vaccination-dose-repeating-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
    return new VaccinationDoseRepeatingMapper(
      resource,
      vaccinationDoseRepeatingExtension
    );
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (
    id: string | undefined
  ) =>
    | VaccinationDoseSingleMapper
    | VaccinationDoseRepeatingMapper
    | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel(model: VaccinationDoseSingle): VaccinationDoseSingleMapper;
  static fromModel(
    model: VaccinationDoseRepeating
  ): VaccinationDoseRepeatingMapper;
  static fromModel(
    model: VaccinationDoseSingle | VaccinationDoseRepeating
  ): VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper {
    return VaccinationDoseMapper.fromResource({
      resourceType: 'Basic',
      meta: {
        profile: [`${settings.fhir.profileBaseUrl}/vp-vaccination-dose`],
      },
      code: { coding: [{ code: 'VaccinationDose' }] },
      subject: { reference: `Basic/${model.vaccinationSchemeId}` },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-vaccination-dose-base-extension`,
          extension: [
            {
              url: 'doseQuantity',
              valueQuantity: {
                system: 'http://unitsofmeasure.org',
                value: model.doseQuantity,
                code: 'ml',
              },
            },
            {
              url: 'http://unitsofmeasure.org',
              valueBoolean: model.isProtected,
            },
            {
              url: 'notes',
              valueMarkdown: model.notes,
            },
          ],
        },
        model.type === 'single'
          ? {
              url: `${settings.fhir.profileBaseUrl}/vp-vaccination-dose-single-extension`,
              extension: [
                {
                  url: 'numberInScheme',
                  valueUnsignedInt: model.numberInScheme,
                },
                ...(model.timeframeStart
                  ? [
                      {
                        url: 'timeframeStart',
                        valueQuantity: {
                          system: 'http://unitsofmeasure.org',
                          value: model.timeframeStart,
                          code: 'd',
                        },
                      },
                    ]
                  : []),
                ...(model.timeframeEnd
                  ? [
                      {
                        url: 'timeframeEnd',
                        valueQuantity: {
                          system: 'http://unitsofmeasure.org',
                          value: model.timeframeEnd,
                          code: 'd',
                        },
                      },
                    ]
                  : []),
              ],
            }
          : {
              url: `${settings.fhir.profileBaseUrl}/vp-vaccination-dose-repeating-extension`,
              extension: [
                {
                  url: 'interval',
                  valueQuantity: {
                    system: 'http://unitsofmeasure.org',
                    value: model.interval.value,
                    code: model.interval.code,
                  },
                },
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

  get _doseQuantityExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'doseQuantity')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get doseQuantity(): number {
    return this._doseQuantityExtension.valueQuantity!.value!;
  }

  set doseQuantity(doseQuantity: number) {
    this._doseQuantityExtension.valueQuantity!.value = doseQuantity;
  }

  withDoseQuantity(doseQuantity: number): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.doseQuantity = doseQuantity;
    return newVaccinationDose;
  }

  get _isProtectedExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'isProtected')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get isProtected(): boolean {
    return this._isProtectedExtension.valueBoolean!;
  }

  set isProtected(isProtected: boolean) {
    this._isProtectedExtension.valueBoolean = isProtected;
  }

  withIsProtected(isProtected: boolean): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.isProtected = isProtected;
    return newVaccinationDose;
  }

  get _notesExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'notes')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get notes(): string {
    return this._notesExtension.valueMarkdown!;
  }

  set notes(notes: string) {
    this._notesExtension.valueMarkdown = notes;
  }

  withNotes(notes: string): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.notes = notes;
    return newVaccinationDose;
  }

  get vaccinationSchemeId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set vaccinationSchemeId(vaccinationSchemeId: string) {
    this._raw.subject!.reference = `Basic/${vaccinationSchemeId}`;
  }

  withVaccinationSchemeId(vaccinationSchemeId: string): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.vaccinationSchemeId = vaccinationSchemeId;
    return newVaccinationDose;
  }
}

export class VaccinationDoseSingleMapper
  extends VaccinationDoseMapper
  implements VaccinationDoseSingle
{
  private _vaccinationDoseSingleExtension: FHIRExtension;
  type: 'single';

  constructor(
    resource: FHIRBasic,
    vaccinationDoseSingleExtension: FHIRExtension
  ) {
    super(resource);
    this.type = 'single';
    this._vaccinationDoseSingleExtension = vaccinationDoseSingleExtension;
  }

  get _numberInSchemeExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'numberInScheme')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get numberInScheme(): number {
    return this._numberInSchemeExtension.valueUnsignedInt!;
  }

  set numberInScheme(numberInScheme: number) {
    this._numberInSchemeExtension.valueUnsignedInt = numberInScheme;
  }

  withNumberInScheme(numberInScheme: number): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.numberInScheme = numberInScheme;
    return newVaccinationDose;
  }

  get _timeframeStartExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'timeframeStart')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get timeframeStart(): number | undefined {
    if (this._timeframeStartExtension === undefined) {
      return undefined;
    }

    const { code, value } = this._timeframeStartExtension.valueQuantity!;
    return TIMEFRAME_VALUE_FACTORS[code! as AgeUnit] * value!;
  }

  set timeframeStart(timeframeStart: number | undefined) {
    if (timeframeStart === undefined) {
      this._vaccinationDoseSingleExtension.extension =
        this._vaccinationDoseSingleExtension.extension!.filter(
          (ex) => ex !== this._timeframeStartExtension
        );
    } else if (this._timeframeStartExtension === undefined) {
      this._vaccinationDoseSingleExtension.extension!.push({
        url: 'timeframeStart',
        valueQuantity: {
          system: 'http://unitsofmeasure.org',
          value: timeframeStart,
          code: 'd',
        },
      });
    } else {
      this._timeframeStartExtension.valueQuantity!.value = timeframeStart;
      this._timeframeStartExtension.valueQuantity!.code = 'd';
    }
  }

  withTimeframeStart(timeframeStart: number | undefined): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.timeframeStart = timeframeStart;
    return newVaccinationDose;
  }

  get _timeframeEndExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'timeframeEnd')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get timeframeEnd(): number | undefined {
    if (this._timeframeEndExtension === undefined) {
      return undefined;
    }

    const { code, value } = this._timeframeEndExtension.valueQuantity!;
    return TIMEFRAME_VALUE_FACTORS[code! as AgeUnit] * value!;
  }

  set timeframeEnd(timeframeEnd: number | undefined) {
    if (timeframeEnd === undefined) {
      this._vaccinationDoseSingleExtension.extension =
        this._vaccinationDoseSingleExtension.extension!.filter(
          (ex) => ex !== this._timeframeEndExtension
        );
    } else if (this._timeframeEndExtension === undefined) {
      this._vaccinationDoseSingleExtension.extension!.push({
        url: 'timeframeEnd',
        valueQuantity: {
          system: 'http://unitsofmeasure.org',
          value: timeframeEnd,
          code: 'd',
        },
      });
    } else {
      this._timeframeEndExtension.valueQuantity!.value = timeframeEnd;
      this._timeframeEndExtension.valueQuantity!.code = 'd';
    }
  }

  withTimeframeEnd(timeframeEnd: number | undefined): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.timeframeEnd = timeframeEnd;
    return newVaccinationDose;
  }
}

export class VaccinationDoseRepeatingMapper
  extends VaccinationDoseMapper
  implements VaccinationDoseRepeating
{
  private _vaccinationDoseRepeatingExtension: FHIRExtension;
  type: 'repeating';

  constructor(
    resource: FHIRBasic,
    vaccinationDoseRepeatingExtension: FHIRExtension
  ) {
    super(resource);
    this.type = 'repeating';
    this._vaccinationDoseRepeatingExtension = vaccinationDoseRepeatingExtension;
  }

  get _intervalExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vaccinationDoseRepeatingExtension,
      `extension.where(url = 'interval')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get interval(): { value: number; code: AgeUnit } {
    const { code, value } = this._intervalExtension.valueQuantity!;
    return { code: code! as AgeUnit, value: value! };
  }

  set interval(interval: { value: number; code: AgeUnit }) {
    this._intervalExtension.valueQuantity!.value = interval.value;
    this._intervalExtension.valueQuantity!.code = interval.code;
  }

  withInterval(interval: { value: number; code: AgeUnit }): this {
    const newVaccinationDose = cloneDeep(this);
    newVaccinationDose.interval = interval;
    return newVaccinationDose;
  }
}
