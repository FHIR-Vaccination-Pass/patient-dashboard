import { Coding as FHIRCoding, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

export interface Location {
  country: string;
  state?: string;
}

export class LocationMapper implements Location {
  private _raw: FHIRExtension;

  constructor(resource: FHIRExtension) {
    this._raw = resource;
  }

  static fromResource<T extends FHIRExtension | undefined>(
    resource: T
  ): T extends FHIRExtension ? LocationMapper : undefined;

  static fromResource(
    resource: FHIRExtension | undefined
  ): LocationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new LocationMapper(resource);
  }

  static fromModel({ country, state }: Location): LocationMapper {
    const newLocation = new LocationMapper({
      url: `${settings.fhir.profileBaseUrl}/vp-location-extension`,
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-country-code-extension`,
          valueCodeableConcept: {
            coding: [{ system: 'urn:iso:std:iso:3166', code: country }],
          },
        },
      ],
    });
    newLocation.state = state;

    return newLocation;
  }

  toResource(): FHIRExtension {
    return this._raw;
  }

  get _countryCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-country-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get country(): string {
    return this._countryCoding.code!;
  }

  set country(country: string) {
    this._countryCoding.code = country;
  }

  withCountry(country: string): LocationMapper {
    const newLocation = cloneDeep(this);
    newLocation.country = country;
    return newLocation;
  }

  get _stateCodeExtension(): FHIRExtension | undefined {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension | undefined;
  }

  get _stateCoding(): FHIRCoding | undefined {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension').valueCodeableConcept.coding.where(system = 'urn:iso:std:iso:3166:-2')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding | undefined;
  }

  get state(): string | undefined {
    return this._stateCoding?.code;
  }

  set state(state: string | undefined) {
    if (state === undefined) {
      this._raw.extension = this._raw.extension!.filter(
        (ex) => ex !== this._stateCodeExtension
      );
    } else if (this._stateCodeExtension === undefined) {
      this._raw.extension!.push({
        url: `${settings.fhir.profileBaseUrl}/vp-state-code-extension`,
        valueCodeableConcept: {
          coding: [{ system: 'urn:iso:std:iso:3166:-2', code: state }],
        },
      });
    } else {
      this._stateCoding!.code = state;
    }
  }

  withState(state: string | undefined): LocationMapper {
    const newLocation = cloneDeep(this);
    newLocation.state = state;
    return newLocation;
  }
}
