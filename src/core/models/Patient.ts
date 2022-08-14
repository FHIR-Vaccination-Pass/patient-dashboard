import { Address } from './Address';
import { HumanName } from './HumanName';
import { Gender } from './Gender';

import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  Address as FHIRAddress,
  Coding as FHIRCoding,
  Extension as FHIRExtension,
  HumanName as FHIRHumanName,
  Patient as FHIRPatient,
} from 'fhir/r4';
import { settings } from '../../settings';

export interface Patient {
  id: string;
  active: boolean;
  name: HumanName;
  gender: Gender;
  birthDate: Date;
  deceased: Date | boolean;
  address: Address;
  isPregnant: boolean;
  keycloakUsername: string;
}

export class PatientMapper implements Patient {
  private _raw: FHIRPatient;

  constructor(resource: FHIRPatient) {
    this._raw = resource;
  }

  static fromResource(resource: FHIRPatient) {
    return new PatientMapper(resource);
  }

  toResource(): FHIRPatient {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get active(): boolean {
    return this._raw.active!;
  }

  get name(): HumanName {
    const officialHumanName = fhirpath.evaluate(
      this._raw,
      `name.where(use = 'official')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRHumanName;

    return {
      family: officialHumanName.family!,
      given: officialHumanName.given!,
    };
  }

  get gender(): Gender {
    return this._raw.gender!;
  }

  get birthDate(): Date {
    return new Date(this._raw.birthDate!);
  }

  get deceased(): Date | boolean {
    return this._raw.deceasedDateTime
      ? new Date(this._raw.deceasedDateTime)
      : this._raw.deceasedBoolean!;
  }

  get address(): Address {
    const homeAddress = fhirpath.evaluate(
      this._raw,
      `address.where(use = 'home')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRAddress;

    const countryCoding = fhirpath.evaluate(
      homeAddress,
      `country.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-country-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    const stateCoding = fhirpath.evaluate(
      homeAddress,
      `state.extension.where(url = '${settings.fhir.profileBaseUrl}/vp-state-code-extension')` +
        `.value.coding.where(system = 'urn:iso:std:iso:3166:-2')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;

    return {
      country: homeAddress.country!,
      countryCode: countryCoding.code!,
      state: homeAddress.state!,
      stateCode: stateCoding.code!,
      district: homeAddress.district,
      postalCode: homeAddress.postalCode,
      city: homeAddress.city,
      line: homeAddress.line,
    };
  }

  get isPregnant(): boolean {
    const isPregnantExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-patient-is-pregnant-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return isPregnantExtension.valueBoolean!;
  }

  get keycloakUsername(): string {
    const keycloakUsernameExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-patient-keycloak-username-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;

    return keycloakUsernameExtension.valueString!;
  }
}
