import { CodeableConcept } from './CodeableConcept';
import {
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  ImmunizationRecommendation as FHIRImmunizationRecommendation,
  ImmunizationRecommendationRecommendationDateCriterion as FHIRImmunizationRecommendationRecommendationDateCriterion,
  Reference as FHIRReference,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

export interface ImmunizationRecommendation {
  id: string;
  date: Date;
  forecastStatus: CodeableConcept;
  vaccineCode: CodeableConcept;
  recommendedStartDate: Date;
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

  static fromResource(resource: FHIRImmunizationRecommendation) {
    return new ImmunizationRecommendationMapper(resource);
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

  get forecastStatus(): CodeableConcept {
    const forecastStatusCoding = fhirpath.evaluate(
      this._raw,
      `recommendation.forecastStatus.coding.where(system = 'http://terminology.hl7.org/CodeSystem/immunization-recommendation-status')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return { id: '', coding: forecastStatusCoding.code!, text: '' };
  }

  get vaccineCode(): CodeableConcept {
    const vaccineCodeCoding = fhirpath.evaluate(
      this._raw,
      `recommendation.forecastStatus.coding.where(system = 'http://fhir.de/CodeSystem/ifa/pzn')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return { id: '', coding: vaccineCodeCoding.code!, text: '' };
  }

  get recommendedStartDate(): Date {
    const earliestDateToGiveDateCriterion = fhirpath.evaluate(
      this._raw,
      `recommendation.dateCriterion.where(code.coding.where(system = 'http://loinc.org').code = '30981-5')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRImmunizationRecommendationRecommendationDateCriterion;

    return new Date(earliestDateToGiveDateCriterion.value);
  }

  get isDeactivated(): boolean {
    const isDeactivatedExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-immunization-recommendation-is-deactivated')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return isDeactivatedExtension.valueBoolean!;
  }

  get supportingImmunizationIds(): string[] {
    const supportingImmunizationReferences = fhirpath.evaluate(
      this._raw,
      `recommendation.supportingImmunization`,
      undefined,
      fhirpath_r4_model
    ) as FHIRReference[];

    return supportingImmunizationReferences.map((reference) => {
      const referenceParts = reference.reference!.split('/');
      return referenceParts[referenceParts.length - 1];
    });
  }

  get fulfillingImmunizationIds(): string[] {
    const fulfillingImmunizationExtensions = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-fulfilling-immunization')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];

    return fulfillingImmunizationExtensions.map((extension) => {
      const referenceParts = extension.valueReference!.reference!.split('/');
      return referenceParts[referenceParts.length - 1];
    });
  }

  get patientId(): string {
    const referenceParts = this._raw.patient.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  get populationRecommendationId(): string {
    const supportingPopulationRecommendationExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-supporting-population-recommendation')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const referenceParts =
      supportingPopulationRecommendationExtension.valueReference!.reference!.split(
        '/'
      );
    return referenceParts[referenceParts.length - 1];
  }

  get vaccinationDoseId(): string {
    const recommendedVaccinationDoseExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-recommended-vaccination-dose')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const referenceParts =
      recommendedVaccinationDoseExtension.valueReference!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }
}
