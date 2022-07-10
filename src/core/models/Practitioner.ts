import { CodeableConcept } from './CodeableConcept';
import { Address } from './Address';
import { HumanName } from './HumanName';
import { Gender } from './Gender';

export interface Practitioner {
  id: string;
  identifier: string;
  active: boolean;
  name: HumanName;
  phoneNumber: string;
  email: string;
  gender: Gender;
  address: Address;
  qualification: PractitionerQualification;
}

interface PractitionerQualification {
  identifier: string;
  code: CodeableConcept;
  issuer: string; // id refering to the id of an organization
}
