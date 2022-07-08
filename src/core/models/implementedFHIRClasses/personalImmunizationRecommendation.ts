import {
  ImmunizationRecommendation,
  ImmunizationRecommendationRecommendation,
  Reference,
} from 'fhir/r4';
import { SingleImmunizationRecommendation } from './singleImmunizationRecommendation';

export class PersonalImmunizationRecommendation
  implements ImmunizationRecommendation
{
  date: string;
  patient: Reference;
  recommendation: ImmunizationRecommendationRecommendation[];
  resourceType: 'ImmunizationRecommendation';

  constructor(
    date: string,
    patient: Reference,
    recommendation: SingleImmunizationRecommendation[],
    resourceType: 'ImmunizationRecommendation'
  ) {
    this.date = date;
    this.patient = patient;
    this.recommendation = recommendation;
    this.resourceType = resourceType;
  }
}
