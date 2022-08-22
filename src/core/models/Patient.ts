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
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

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

  static fromResource<T extends FHIRPatient | undefined>(
    resource: T
  ): T extends FHIRPatient ? PatientMapper : undefined;

  static fromResource(
    resource: FHIRPatient | undefined
  ): PatientMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new PatientMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRPatient | undefined
  ): (id: string | undefined) => PatientMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel({
    active,
    name,
    gender,
    birthDate,
    deceased,
    address,
    isPregnant,
    keycloakUsername,
  }: Patient): PatientMapper {
    return new PatientMapper({
      resourceType: 'Patient',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-patient`] },
      active,
      name: [HumanNameMapper.fromModel(name).toResource()],
      gender,
      birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
      ...(typeof deceased === 'boolean'
        ? { deceasedBoolean: deceased }
        : { deceasedDateTime: dayjs(deceased).format('YYYY-MM-DD') }),
      address: [AddressMapper.fromModel(address).toResource()],
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-patient-is-pregnant-extension`,
          valueBoolean: isPregnant,
        },
        {
          url: `${settings.fhir.profileBaseUrl}/vp-patient-keycloak-username-extension`,
          valueString: keycloakUsername,
        },
      ],
    });
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

  set active(active: boolean) {
    this._raw.active = active;
  }

  withActive(active: boolean): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.active = active;
    return newPatient;
  }

  get _officialHumanName(): FHIRHumanName {
    return fhirpath.evaluate(
      this._raw,
      `name.where(use = 'official')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRHumanName;
  }

  get name(): HumanNameMapper {
    return HumanNameMapper.fromResource(this._officialHumanName);
  }

  set name(name: HumanNameMapper) {
    this._raw.name = this._raw.name?.map((hm) =>
      hm === this._officialHumanName ? name.toResource() : hm
    );
  }

  withName(name: HumanNameMapper): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.name = name;
    return newPatient;
  }

  get gender(): Gender {
    return this._raw.gender!;
  }

  set gender(gender: Gender) {
    this._raw.gender = gender;
  }

  withGender(gender: Gender): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.gender = gender;
    return newPatient;
  }

  get birthDate(): Date {
    return new Date(this._raw.birthDate!);
  }

  set birthDate(date: Date) {
    this._raw.birthDate = dayjs(date).format('YYYY-MM-DD');
  }

  withBirthDate(date: Date): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.birthDate = date;
    return newPatient;
  }

  get deceased(): Date | boolean {
    return this._raw.deceasedDateTime
      ? new Date(this._raw.deceasedDateTime)
      : this._raw.deceasedBoolean!;
  }

  set deceased(deceased: Date | boolean) {
    if (typeof deceased === 'boolean') {
      this._raw.deceasedBoolean = deceased;
    } else {
      this._raw.deceasedDateTime = dayjs(deceased).format('YYYY-MM-DD');
    }
  }

  withDeceased(deceased: Date | boolean): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.deceased = deceased;
    return newPatient;
  }

  get _homeAddress(): FHIRAddress {
    return fhirpath.evaluate(
      this._raw,
      `address.where(use = 'home')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRAddress;
  }

  get address(): AddressMapper {
    return AddressMapper.fromResource(this._homeAddress);
  }

  set address(address: AddressMapper) {
    this._raw.address = this._raw.address?.map((a) =>
      a === this._homeAddress ? address.toResource() : a
    );
  }

  withAddress(address: AddressMapper): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.address = address;
    return newPatient;
  }

  get _isPregnantExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-patient-is-pregnant-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get isPregnant(): boolean {
    return this._isPregnantExtension.valueBoolean!;
  }

  set isPregnant(isPregnant: boolean) {
    this._isPregnantExtension.valueBoolean = isPregnant;
  }

  withIsPregnant(isPregnant: boolean): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.isPregnant = isPregnant;
    return newPatient;
  }

  get _keycloakUsernameExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-patient-keycloak-username-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get keycloakUsername(): string {
    return this._keycloakUsernameExtension.valueString!;
  }

  set keycloakUsername(keycloakUsername: string) {
    this._keycloakUsernameExtension.valueString = keycloakUsername;
  }

  withKeycloakUsername(keycloakUsername: string): PatientMapper {
    const newPatient = cloneDeep(this);
    newPatient.keycloakUsername = keycloakUsername;
    return newPatient;
  }
}
