import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { Address as FHIRAddress, Coding as FHIRCoding } from 'fhir/r4';
import { settings } from '../../settings';
import { cloneDeep } from 'lodash';

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

  static fromModel({
    country,
    countryCode,
    state,
    stateCode,
    district,
    postalCode,
    city,
    line,
  }: Address): AddressMapper {
    return new AddressMapper({
      country,
      _country: {
        extension: [
          {
            url: `${settings.fhir.profileBaseUrl}/vp-country-code-extension`,
            valueCodeableConcept: {
              coding: [{ system: 'urn:iso:std:iso:3166', code: countryCode }],
            },
          },
        ],
      },
      state,
      _state: {
        extension: [
          {
            url: `${settings.fhir.profileBaseUrl}/vp-state-code-extension`,
            valueCodeableConcept: {
              coding: [{ system: 'urn:iso:std:iso:3166:-2', code: stateCode }],
            },
          },
        ],
      },
      district,
      postalCode,
      city,
      line,
    });
  }

  toResource(): FHIRAddress {
    return this._raw;
  }

  get country(): string {
    return this._raw.country!;
  }

  set country(country: string) {
    this._raw.country = country;
  }

  withCountry(country: string): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.country = country;
    return newAddress;
  }

  get _countryCodeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `country.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-country-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get countryCode(): string {
    return this._countryCodeCoding.code!;
  }

  set countryCode(countryCode: string) {
    this._countryCodeCoding.code = countryCode;
  }

  withCountryCode(countryCode: string): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.countryCode = countryCode;
    return newAddress;
  }

  get state(): string {
    return this._raw.state!;
  }

  set state(state: string) {
    this._raw.state = state;
  }

  withState(state: string): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.state = state;
    return newAddress;
  }

  get _stateCodeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._raw,
      `state.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166:-2')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get stateCode(): string {
    return this._stateCodeCoding.code!;
  }

  set stateCode(stateCode: string) {
    this._stateCodeCoding.code = stateCode;
  }

  withStateCode(stateCode: string): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.stateCode = stateCode;
    return newAddress;
  }

  get district(): string | undefined {
    return this._raw.district;
  }

  set district(district: string | undefined) {
    this._raw.district = district;
  }

  withDistrict(district: string | undefined): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.district = district;
    return newAddress;
  }

  get postalCode(): string | undefined {
    return this._raw.postalCode;
  }

  set postalCode(postalCode: string | undefined) {
    this._raw.postalCode = postalCode;
  }

  withPostalCode(postalCode: string | undefined): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.postalCode = postalCode;
    return newAddress;
  }

  get city(): string | undefined {
    return this._raw.city;
  }

  set city(city: string | undefined) {
    this._raw.city = city;
  }

  withCity(city: string | undefined): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.city = city;
    return newAddress;
  }

  get line(): string[] | undefined {
    return this._raw.line;
  }

  set line(line: string[] | undefined) {
    this._raw.line = line;
  }

  withLine(line: string[] | undefined): AddressMapper {
    const newAddress = cloneDeep(this);
    newAddress.line = line;
    return newAddress;
  }
}
