import { VacationPlan } from './VacationPlan';

export type Gender = 'male' | 'female' | 'other' | 'unknown';

export interface Patient {
  identifier: string;
  active: boolean;
  name: HumanName;
  telecom: ContactPoint;
  gender: Gender;
  birthdate: Date;
  address: Address;
  isPregnant: boolean;
  vacationPlans: Array<VacationPlan>;
}

export interface HumanName {
  family: string;
  given: string[];
  prefix: string[];
  suffix: string[];
}

export interface ContactPoint {
  system: 'phone'|'fax'|'email'|'pager'|'url'|'sms'|'other';
  use: 'home'|'work'|'temp'|'old'|'mobile';
  value: string;
}

export interface Address {
  city: string;
  country: string;
  district: string;
  line: string;
  postalCode: string;
  state: string;
}
