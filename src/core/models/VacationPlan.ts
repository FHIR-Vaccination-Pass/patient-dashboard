import { Location, LocationMapper } from './Location';

import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

export interface VacationPlan {
  id: string;
  departureDate: Date;
  locations: Location[];
}

export class VacationPlanMapper {
  private _raw: FHIRBasic;
  locations: Location[];

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    const locationExtensions = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vacation-plan-extension')` +
        `.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-location-extension')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
    this.locations = locationExtensions.map(LocationMapper.fromResource);
  }

  static fromResource(resource: FHIRBasic) {
    return new VacationPlanMapper(resource);
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get departureDate(): Date {
    const departureDateExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vacation-plan-extension')` +
        `.extension.where(url = 'departureDate')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return new Date(departureDateExtension.valueDate!);
  }
}
