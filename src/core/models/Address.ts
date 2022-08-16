import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { Address as FHIRAddress, Coding as FHIRCoding } from 'fhir/r4';
import { settings } from '../../settings';

export interface Address {
  country: string;
  countryCode: string;
  state: string;
  stateCode: string;
  district?: string;
  postalCode?: string;
  city?: string;
  line?: string[];
}

export class AddressMapper {
  private _raw: FHIRAddress;

  constructor(resource: FHIRAddress) {
    this._raw = resource;
  }

  static fromResource<T extends FHIRAddress | undefined>(
    resource: T
  ): T extends FHIRAddress ? AddressMapper : undefined;

  static fromResource(
    resource: FHIRAddress | undefined
  ): AddressMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new AddressMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRAddress | undefined
  ): (id: string | undefined) => AddressMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIRAddress {
    return this._raw;
  }

  get country(): string {
    return this._raw.country!;
  }

  get countryCode(): string {
    const countryCoding = fhirpath.evaluate(
      this._raw,
      `country.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-country-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return countryCoding.code!;
  }

  get state(): string {
    return this._raw.state!;
  }

  get stateCode(): string {
    const stateCoding = fhirpath.evaluate(
      this._raw,
      `state.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166:-2')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return stateCoding.code!;
  }

  get district(): string | undefined {
    return this._raw.district;
  }

  get postalCode(): string | undefined {
    return this._raw.postalCode;
  }

  get city(): string | undefined {
    return this._raw.city;
  }

  get line(): string[] | undefined {
    return this._raw.line;
  }
}
