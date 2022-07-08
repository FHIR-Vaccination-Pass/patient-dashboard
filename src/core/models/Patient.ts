import { Address, ContactPoint, HumanName, Identifier } from 'fhir/r4';
import { VacationPlan } from './VacationPlan';

export type Gender = 'male' | 'female' | 'other' | 'unknown';

export interface Patient {
  identifier: Identifier;
  active: boolean;
  name: HumanName;
  telecom: ContactPoint;
  gender: Gender;
  birthdate: Date;
  address: Address;
  isPregnant: boolean;
  vacationPlans: Array<VacationPlan>;
}
