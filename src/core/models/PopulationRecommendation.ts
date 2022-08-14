import { Location, LocationMapper } from './Location';

import {
  Basic as FHIRBasic,
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  Quantity as FHIRQuantity,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

export interface PopulationRecommendation {
  id: string;
  ageStart?: number;
  ageEnd?: number;
  locations: Location[];
  diseaseId: string;
}

export class PopulationRecommendationMapper
  implements PopulationRecommendation
{
  private _raw: FHIRBasic;
  private _populationRecommendationExtension: FHIRExtension;
  locations: Location[];

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._populationRecommendationExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-population-recommendation-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    const locationExtensions = fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-location-extension')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
    this.locations = locationExtensions.map(LocationMapper.fromResource);
  }

  static fromResource(resource: FHIRBasic) {
    return new PopulationRecommendationMapper(resource);
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get ageStart(): number | undefined {
    const ageStartQuantity = fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'ageStart').value`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRQuantity | undefined;

    return ageStartQuantity?.value;
  }

  get ageEnd(): number | undefined {
    const ageEndQuantity = fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'ageEnd').value`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRQuantity | undefined;

    return ageEndQuantity?.value;
  }

  get diseaseId(): string {
    const targetDiseaseCoding = fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'targetDisease').value.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return targetDiseaseCoding.code!;
  }
}
