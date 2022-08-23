import { CodeableConcept } from './CodeableConcept';
import {
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  ImmunizationRecommendation as FHIRImmunizationRecommendation,
  ImmunizationRecommendationRecommendationDateCriterion as FHIRImmunizationRecommendationRecommendationDateCriterion,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export type ImmunizationRecommendationStatus =
  | 'complete'
  | 'future'
  | 'due'
  | 'overdue';

export interface ImmunizationRecommendation {
  id: string;
  date: Date;
  forecastStatus: CodeableConcept;
  vaccineCode: CodeableConcept;
  targetDisease: CodeableConcept;
  recommendedStartDate: Date;
  status: ImmunizationRecommendationStatus;
  isDeactivated: boolean;
  supportingImmunizationIds: string[];
  fulfillingImmunizationIds: string[];
  patientId: string;
  populationRecommendationId: string;
  vaccinationDoseId: string;
}

export class ImmunizationRecommendationMapper
  implements ImmunizationRecommendation
{
  private _raw: FHIRImmunizationRecommendation;

  constructor(resource: FHIRImmunizationRecommendation) {
    this._raw = resource;
  }

  static fromResource<T extends FHIRImmunizationRecommendation | undefined>(
    resource: T
  ): T extends FHIRImmunizationRecommendation
    ? ImmunizationRecommendationMapper
    : undefined;

  static fromResource(
    resource: FHIRImmunizationRecommendation | undefined
  ): ImmunizationRecommendationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new ImmunizationRecommendationMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRImmunizationRecommendation | undefined
  ): (id: string | undefined) => ImmunizationRecommendationMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel({
    id,
    date,
    forecastStatus,
    vaccineCode,
    targetDisease,
    recommendedStartDate,
    isDeactivated,
    supportingImmunizationIds,
    fulfillingImmunizationIds,
    patientId,
    populationRecommendationId,
    vaccinationDoseId,
  }: ImmunizationRecommendation): ImmunizationRecommendationMapper {
    return new ImmunizationRecommendationMapper({
      id: id || uuidv4(),
      resourceType: 'ImmunizationRecommendation',
      meta: {
        profile: [
          `${settings.fhir.profileBaseUrl}/vp-immunization-recommendation`,
        ],
      },
      date: dayjs(date).format('YYYY-MM-DD'),
      patient: { reference: `Patient/${patientId}` },
      recommendation: [
        {
          forecastStatus: {
            coding: [
              {
                system: forecastStatus.coding.system,
                code: forecastStatus.coding.code,
              },
            ],
          },
          vaccineCode: [
            {
              coding: [
                {
                  system: vaccineCode.coding.system,
                  code: vaccineCode.coding.code,
                },
              ],
            },
          ],
          targetDisease: {
            coding: [
              {
                system: targetDisease.coding.system,
                code: targetDisease.coding.code,
              },
            ],
          },
          dateCriterion: [
            {
              code: {
                coding: [{ system: 'http://loinc.org', code: '30981-5' }],
              },
              value: dayjs(recommendedStartDate).format('YYYY-MM-DD'),
            },
          ],
          supportingImmunization: supportingImmunizationIds.map((siId) => ({
            reference: `Immunization/${siId}`,
          })),
        },
      ],
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-immunization-recommendation-is-deactivated`,
          valueBoolean: isDeactivated,
        },
        ...fulfillingImmunizationIds.map((fiId) => ({
          url: `${settings.fhir.profileBaseUrl}/vp-fulfilling-immunization`,
          valueReference: { reference: `Immunization/${fiId}` },
        })),
        {
          url: `${settings.fhir.profileBaseUrl}/vp-supporting-population-recommendation`,
          valueReference: { reference: `Basic/${populationRecommendationId}` },
        },
        {
          url: `${settings.fhir.profileBaseUrl}/vp-recommended-vaccination-dose`,
          valueReference: { reference: `Basic/${vaccinationDoseId}` },
        },
      ],
    });
  }

  toResource(): FHIRImmunizationRecommendation {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get date(): Date {
    return new Date(this._raw.date);
  }

  set date(date: Date) {
    this._raw.date = dayjs(date).format('YYYY-MM-DD');
  }

  withDate(date: Date): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.date = date;
    return newImmunizationRecommendation;
  }

  get _forecastStatusCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `recommendation.forecastStatus.coding.where(system = 'http://terminology.hl7.org/CodeSystem/immunization-recommendation-status')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get forecastStatus(): CodeableConcept {
    return {
      coding: {
        code: this._forecastStatusCoding.code!,
        system: this._forecastStatusCoding.system!,
      },
    };
  }

  set forecastStatus(forecastStatus: CodeableConcept) {
    this._forecastStatusCoding.code = forecastStatus.coding.code;
    this._forecastStatusCoding.system = forecastStatus.coding.system;
  }

  withForecastStatus(
    forecastStatus: CodeableConcept
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.forecastStatus = forecastStatus;
    return newImmunizationRecommendation;
  }

  get _vaccineCodeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `recommendation.vaccineCode.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
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

  withVaccineCode(
    vaccineCode: CodeableConcept
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.vaccineCode = vaccineCode;
    return newImmunizationRecommendation;
  }

  get _targetDiseaseCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `recommendation.targetDisease.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get targetDisease(): CodeableConcept {
    return {
      coding: {
        code: this._targetDiseaseCoding.code!,
        system: this._targetDiseaseCoding.system!,
      },
    };
  }

  set targetDisease(targetDisease: CodeableConcept) {
    this._targetDiseaseCoding.code = targetDisease.coding.code;
    this._targetDiseaseCoding.system = targetDisease.coding.system;
  }

  withTargetDisease(
    targetDisease: CodeableConcept
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.targetDisease = targetDisease;
    return newImmunizationRecommendation;
  }

  get _earliestDateToGiveDateCriterion(): FHIRImmunizationRecommendationRecommendationDateCriterion {
    return fhirpath.evaluate(
      this._raw,
      `recommendation.dateCriterion.where(code.coding.where(system = 'http://loinc.org').code = '30981-5')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRImmunizationRecommendationRecommendationDateCriterion;
  }

  get recommendedStartDate(): Date {
    return new Date(this._earliestDateToGiveDateCriterion.value);
  }

  set recommendedStartDate(recommendedStartDate: Date) {
    this._earliestDateToGiveDateCriterion.value =
      dayjs(recommendedStartDate).format('YYYY-MM-DD');
  }

  withRecommendedStartDate(
    recommendedStartDate: Date
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.recommendedStartDate = recommendedStartDate;
    return newImmunizationRecommendation;
  }

  get status(): ImmunizationRecommendationStatus {
    const now = dayjs();
    const recommendedStartDate = dayjs(this.recommendedStartDate);

    if (this.fulfillingImmunizationIds.length > 0) {
      return 'complete';
    }
    if (recommendedStartDate.isBefore(now)) {
      return 'overdue';
    }
    if (recommendedStartDate.isBefore(now.add(30, 'day'))) {
      return 'due';
    }
    return 'future';
  }

  get _isDeactivatedExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-immunization-recommendation-is-deactivated')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get isDeactivated(): boolean {
    return this._isDeactivatedExtension.valueBoolean!;
  }

  set isDeactivated(isDeactivated: boolean) {
    this._isDeactivatedExtension.valueBoolean = isDeactivated;
  }

  withIsDeactivated(isDeactivated: boolean): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.isDeactivated = isDeactivated;
    return newImmunizationRecommendation;
  }

  get supportingImmunizationIds(): string[] {
    return this._raw.recommendation[0].supportingImmunization!.map(
      (reference) => {
        const referenceParts = reference.reference!.split('/');
        return referenceParts[referenceParts.length - 1];
      }
    );
  }

  set supportingImmunizationIds(supportingImmunizationIds: string[]) {
    this._raw.recommendation[0].supportingImmunization =
      supportingImmunizationIds.map((siId) => ({
        reference: `Immunization/${siId}`,
      }));
  }

  withSupportingImmunizationIds(
    supportingImmunizationIds: string[]
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.supportingImmunizationIds =
      supportingImmunizationIds;
    return newImmunizationRecommendation;
  }

  get _fulfillingImmunizationExtensions(): FHIRExtension[] {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-fulfilling-immunization')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
  }

  get fulfillingImmunizationIds(): string[] {
    return this._fulfillingImmunizationExtensions.map((extension) => {
      const referenceParts = extension.valueReference!.reference!.split('/');
      return referenceParts[referenceParts.length - 1];
    });
  }

  set fulfillingImmunizationIds(fulfillingImmunizationIds: string[]) {
    this._raw.extension = this._raw
      .extension!.filter(
        (ex) => !this._fulfillingImmunizationExtensions.includes(ex)
      )
      .concat(
        fulfillingImmunizationIds.map((fiId) => ({
          url: `${settings.fhir.profileBaseUrl}/vp-fulfilling-immunization`,
          valueReference: { reference: `Immunization/${fiId}` },
        }))
      );
  }

  withFulfillingImmunizationIds(
    fulfillingImmunizationIds: string[]
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.fulfillingImmunizationIds =
      fulfillingImmunizationIds;
    return newImmunizationRecommendation;
  }

  get patientId(): string {
    const referenceParts = this._raw.patient.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set patientId(patientId: string) {
    this._raw.patient.reference = `Patient/${patientId}`;
  }

  withPatientId(patientId: string): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.patientId = patientId;
    return newImmunizationRecommendation;
  }

  get _supportingPopulationRecommendationExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-supporting-population-recommendation')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get populationRecommendationId(): string {
    const referenceParts =
      this._supportingPopulationRecommendationExtension.valueReference!.reference!.split(
        '/'
      );
    return referenceParts[referenceParts.length - 1];
  }

  set populationRecommendationId(populationRecommendationId: string) {
    this._supportingPopulationRecommendationExtension.valueReference!.reference = `Basic/${populationRecommendationId}`;
  }

  withPopulationRecommendationId(
    populationRecommendationId: string
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.populationRecommendationId =
      populationRecommendationId;
    return newImmunizationRecommendation;
  }

  get _recommendedVaccinationDoseExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-recommended-vaccination-dose')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get vaccinationDoseId(): string {
    const referenceParts =
      this._recommendedVaccinationDoseExtension.valueReference!.reference!.split(
        '/'
      );
    return referenceParts[referenceParts.length - 1];
  }

  set vaccinationDoseId(vaccinationDoseId: string) {
    this._recommendedVaccinationDoseExtension.valueReference!.reference = `Basic/${vaccinationDoseId}`;
  }

  withVaccinationDoseId(
    vaccinationDoseId: string
  ): ImmunizationRecommendationMapper {
    const newImmunizationRecommendation = cloneDeep(this);
    newImmunizationRecommendation.vaccinationDoseId = vaccinationDoseId;
    return newImmunizationRecommendation;
  }
}
