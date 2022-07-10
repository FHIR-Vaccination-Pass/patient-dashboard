import { CodeableConcept } from './CodeableConcept';
import {Address, ContactPoint, Gender, HumanName} from './Patient';

export interface Practitioner {
  identifier: string;
  active: boolean;
  name: HumanName;
  phoneNumber: ContactPoint;
  email: ContactPoint;
  gender: Gender;
  address: Address;
  qualification: PractitionerQualification;
}

interface PractitionerQualification {
  identifier: string;
  code: CodeableConcept;
  issuer: string; // id refering to the id of an organization
}
