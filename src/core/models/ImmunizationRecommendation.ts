import { CodeableConcept } from './CodeableConcept';

export interface ImmunizationRecommendation {
  identifier: string;
  date: Date;
  forecastStatus: CodeableConcept;
  forecastReason: CodeableConcept;
  vaccineCode: CodeableConcept;
  recommendedStartDate: Date;
  isDeactivated: boolean;
}
