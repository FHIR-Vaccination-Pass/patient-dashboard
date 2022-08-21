import { Location, LocationMapper } from './Location';

import {
  Basic as FHIRBasic,
  Coding as FHIRCoding,
  Extension as FHIRExtension,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

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

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._populationRecommendationExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-population-recommendation-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic ? PopulationRecommendationMapper : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): PopulationRecommendationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new PopulationRecommendationMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (id: string | undefined) => PopulationRecommendationMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get _ageStartExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'ageStart')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get ageStart(): number | undefined {
    return this._ageStartExtension?.valueAge!.value!;
  }

  set ageStart(ageStart: number | undefined) {
    if (ageStart === undefined) {
      this._populationRecommendationExtension.extension =
        this._populationRecommendationExtension.extension!.filter(
          (ex) => ex !== this._ageStartExtension
        );
    } else if (this._ageStartExtension === undefined) {
      this._populationRecommendationExtension.extension!.push({
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

  withAgeStart(ageStart: number | undefined): PopulationRecommendationMapper {
    const newPopulationRecommendation = cloneDeep(this);
    newPopulationRecommendation.ageStart = ageStart;
    return newPopulationRecommendation;
  }

  get _ageEndExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'ageEnd')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get ageEnd(): number | undefined {
    return this._ageEndExtension?.valueAge!.value!;
  }

  set ageEnd(ageEnd: number | undefined) {
    if (ageEnd === undefined) {
      this._populationRecommendationExtension.extension =
        this._populationRecommendationExtension.extension!.filter(
          (ex) => ex !== this._ageEndExtension
        );
    } else if (this._ageEndExtension === undefined) {
      this._populationRecommendationExtension.extension!.push({
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

  withAgeEnd(ageEnd: number | undefined): PopulationRecommendationMapper {
    const newPopulationRecommendation = cloneDeep(this);
    newPopulationRecommendation.ageEnd = ageEnd;
    return newPopulationRecommendation;
  }

  get _locationExtensions(): FHIRExtension[] {
    return fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-location-extension')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
  }

  get locations(): LocationMapper[] {
    return this._locationExtensions.map(LocationMapper.fromResource);
  }

  set locations(locations: LocationMapper[]) {
    this._populationRecommendationExtension.extension =
      this._populationRecommendationExtension
        .extension!.filter((ex) => !this._locationExtensions.includes(ex))
        .concat(locations.map((l) => l.toResource()));
  }

  withLocations(locations: LocationMapper[]): PopulationRecommendationMapper {
    const newPopulationRecommendation = cloneDeep(this);
    newPopulationRecommendation.locations = locations;
    return newPopulationRecommendation;
  }

  get _targetDiseaseCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._populationRecommendationExtension,
      `extension.where(url = 'targetDisease').value.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get diseaseId(): string {
    return this._targetDiseaseCoding.code!;
  }

  set diseaseId(diseaseId: string) {
    this._targetDiseaseCoding.code = diseaseId;
  }

  withDiseaseId(diseaseId: string): PopulationRecommendationMapper {
    const newPopulationRecommendation = cloneDeep(this);
    newPopulationRecommendation.diseaseId = diseaseId;
    return newPopulationRecommendation;
  }
}
