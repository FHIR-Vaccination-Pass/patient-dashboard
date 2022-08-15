import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

export interface ActiveVaccinationScheme {
  id: string;
  changeReason: string;
  vaccinationSchemeId: string;
  patientId: string;
}

export class ActiveVaccinationSchemeMapper implements ActiveVaccinationScheme {
  private _raw: FHIRBasic;
  private _activeVaccinationSchemeExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._activeVaccinationSchemeExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-active-vaccination-scheme-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic ? ActiveVaccinationSchemeMapper : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): ActiveVaccinationSchemeMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new ActiveVaccinationSchemeMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (id: string | undefined) => ActiveVaccinationSchemeMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get changeReason(): string {
    const changeReasonExtension = fhirpath.evaluate(
      this._activeVaccinationSchemeExtension,
      `extension.where(url = 'changeReason')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return changeReasonExtension.valueMarkdown!;
  }

  get vaccinationSchemeId(): string {
    const vaccinationSchemeExtension = fhirpath.evaluate(
      this._activeVaccinationSchemeExtension,
      `extension.where(url = 'vaccinationScheme')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const referenceParts =
      vaccinationSchemeExtension.valueReference!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  get patientId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }
}
