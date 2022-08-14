import { Address, AddressMapper } from './Address';
import { HumanName, HumanNameMapper } from './HumanName';
import { Gender } from './Gender';

import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  Address as FHIRAddress,
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
  name: HumanName;
  address: Address;

  constructor(resource: FHIRPatient) {
    this._raw = resource;

    const officialHumanName = fhirpath.evaluate(
      this._raw,
      `name.where(use = 'official')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRHumanName;
    this.name = HumanNameMapper.fromResource(officialHumanName);

    const homeAddress = fhirpath.evaluate(
      this._raw,
      `address.where(use = 'home')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRAddress;
    this.address = AddressMapper.fromResource(homeAddress);
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
