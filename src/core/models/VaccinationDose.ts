import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

// normalize to days
type AgeUnit = 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
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
  numberInScheme: number;
  timeframeStart?: number;
  timeframeEnd?: number;
}

export interface VaccinationDoseRepeating extends VaccinationDose {
  interval: number;
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

  static fromResource(
    resource: FHIRBasic
  ): VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper {
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

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get doseQuantity(): number {
    const doseQuantityExtension = fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'doseQuantity')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return doseQuantityExtension.valueQuantity!.value!;
  }

  get isProtected(): boolean {
    const isProtectedExtension = fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'isProtected')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return isProtectedExtension.valueBoolean!;
  }

  get notes(): string {
    const notesExtension = fhirpath.evaluate(
      this._vaccinationDoseBaseExtension,
      `extension.where(url = 'notes')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return notesExtension.valueMarkdown!;
  }

  get vaccinationSchemeId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }
}

export class VaccinationDoseSingleMapper
  extends VaccinationDoseMapper
  implements VaccinationDoseSingle
{
  private _vaccinationDoseSingleExtension: FHIRExtension;

  constructor(
    resource: FHIRBasic,
    vaccinationDoseSingleExtension: FHIRExtension
  ) {
    super(resource);
    this._vaccinationDoseSingleExtension = vaccinationDoseSingleExtension;
  }

  get numberInScheme(): number {
    const numberInSchemeExtension = fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'numberInScheme')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return numberInSchemeExtension.valueUnsignedInt!;
  }

  get timeframeStart(): number | undefined {
    const timeframeStartExtension = fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'timeframeStart')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
    if (timeframeStartExtension === undefined) {
      return undefined;
    }

    const { code, value } = timeframeStartExtension.valueQuantity!;
    return TIMEFRAME_VALUE_FACTORS[code! as AgeUnit] * value!;
  }

  get timeframeEnd(): number | undefined {
    const timeframeEndExtension = fhirpath.evaluate(
      this._vaccinationDoseSingleExtension,
      `extension.where(url = 'timeframeEnd')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
    if (timeframeEndExtension === undefined) {
      return undefined;
    }

    const { code, value } = timeframeEndExtension.valueQuantity!;
    return TIMEFRAME_VALUE_FACTORS[code! as AgeUnit] * value!;
  }
}

export class VaccinationDoseRepeatingMapper
  extends VaccinationDoseMapper
  implements VaccinationDoseRepeating
{
  private _vaccinationDoseRepeatingExtension: FHIRExtension;

  constructor(
    resource: FHIRBasic,
    vaccinationDoseRepeatingExtension: FHIRExtension
  ) {
    super(resource);
    this._vaccinationDoseRepeatingExtension = vaccinationDoseRepeatingExtension;
  }

  get interval(): number {
    const timeframeEndExtension = fhirpath.evaluate(
      this._vaccinationDoseRepeatingExtension,
      `extension.where(url = 'interval')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const { code, value } = timeframeEndExtension.valueQuantity!;
    return TIMEFRAME_VALUE_FACTORS[code! as AgeUnit] * value!;
  }
}
