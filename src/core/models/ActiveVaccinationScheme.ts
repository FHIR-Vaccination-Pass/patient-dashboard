import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

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

  static fromModel({
    changeReason,
    vaccinationSchemeId,
    patientId,
  }: ActiveVaccinationScheme): ActiveVaccinationSchemeMapper {
    return new ActiveVaccinationSchemeMapper({
      resourceType: 'Basic',
      meta: {
        profile: [
          `${settings.fhir.profileBaseUrl}/vp-active-vaccination-scheme`,
        ],
      },
      code: { coding: [{ code: 'ActiveVaccinationScheme' }] },
      subject: { reference: `Patient/${patientId}` },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-active-vaccination-scheme-extension`,
          extension: [
            { url: 'changeReason', valueMarkdown: changeReason },
            {
              url: 'vaccinationScheme',
              valueReference: { reference: `Basic/${vaccinationSchemeId}` },
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

  get _changeReasonExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._activeVaccinationSchemeExtension,
      `extension.where(url = 'changeReason')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get changeReason(): string {
    return this._changeReasonExtension.valueMarkdown!;
  }

  set changeReason(changeReason: string) {
    this._changeReasonExtension.valueMarkdown = changeReason;
  }

  withChangeReason(changeReason: string): ActiveVaccinationSchemeMapper {
    const newActiveVaccinationScheme = cloneDeep(this);
    newActiveVaccinationScheme.changeReason = changeReason;
    return newActiveVaccinationScheme;
  }

  get _vaccinationSchemeExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._activeVaccinationSchemeExtension,
      `extension.where(url = 'vaccinationScheme')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get vaccinationSchemeId(): string {
    const referenceParts =
      this._vaccinationSchemeExtension.valueReference!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set vaccinationSchemeId(vaccinationSchemeId: string) {
    this._vaccinationSchemeExtension.valueReference!.reference = `Basic/${vaccinationSchemeId}`;
  }

  withVaccinationSchemeId(
    vaccinationSchemeId: string
  ): ActiveVaccinationSchemeMapper {
    const newActiveVaccinationScheme = cloneDeep(this);
    newActiveVaccinationScheme.vaccinationSchemeId = vaccinationSchemeId;
    return newActiveVaccinationScheme;
  }

  get patientId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set patientId(patientId: string) {
    this._raw.subject!.reference = `Patient/${patientId}`;
  }

  withPatientId(patientId: string): ActiveVaccinationSchemeMapper {
    const newActiveVaccinationScheme = cloneDeep(this);
    newActiveVaccinationScheme.patientId = patientId;
    return newActiveVaccinationScheme;
  }
}
