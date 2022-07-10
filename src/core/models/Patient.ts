import { VacationPlan } from './VacationPlan';
import { Address } from './Address';
import { HumanName } from './HumanName';
import { Gender } from './Gender';

export interface Patient {
  identifier: string;
  active: boolean;
  name: HumanName;
  email: string;
  phoneNumber: string;
  gender: Gender;
  birthdate: Date;
  address: Address;
  isPregnant: boolean;
  vacationPlans: Array<VacationPlan>;
}
