import { CodeableConcept, Identifier } from 'fhir/r4';

export interface ImmunizationRecommendation {
  identifier: Identifier;
  date: Date;
  forecastStatus: CodeableConcept;
  forecastReason: CodeableConcept;
  vacineCode: CodeableConcept;
  recommendedStartDate: Date;
  isDeactivated: boolean;
}
