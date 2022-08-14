import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

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

  static fromResource(resource: FHIRBasic): VaccinationSchemeMapper {
    return new VaccinationSchemeMapper(resource);
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get name(): string {
    const nameExtension = fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return nameExtension.valueString!;
  }

  get type(): VaccinationSchemeType {
    const typeExtension = fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'type')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return typeExtension.valueString! as VaccinationSchemeType;
  }

  get isPreferred(): boolean {
    const isPreferredExtension = fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'isPreferred')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return isPreferredExtension.valueBoolean!;
  }

  get ageStart(): number | undefined {
    const ageStartExtension = fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'ageStart')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;

    return ageStartExtension?.valueAge?.value;
  }

  get ageEnd(): number | undefined {
    const ageEndExtension = fhirpath.evaluate(
      this._vaccinationSchemeExtension,
      `extension.where(url = 'ageEnd')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;

    return ageEndExtension?.valueAge?.value;
  }

  get medicationId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }
}
