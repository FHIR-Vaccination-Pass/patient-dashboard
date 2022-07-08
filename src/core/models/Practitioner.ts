import {
  Address,
  ContactPoint,
  HumanName,
  Identifier,
  PractitionerQualification,
} from 'fhir/r4';
import { Gender } from './Patient';

export interface Practitioner {
  identifier: Identifier;
  active: boolean;
  name: HumanName;
  phoneNumber: ContactPoint;
  email: ContactPoint;
  gender: Gender;
  address: Address;
  qualification: PractitionerQualification;
}
