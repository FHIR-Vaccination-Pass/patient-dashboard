import { Basic as FHIRBasic, Coding as FHIRCoding, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';

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

  toResource(): FHIRExtension {
    return this._raw;
  }

  get country(): string {
    const countryCoding = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-country-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return countryCoding.code!;
  }

  get state(): string | undefined {
    const stateCoding = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166:-2')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding | undefined;

    return stateCoding?.code;
  }
}
