import { CodeableConcept } from './CodeableConcept';

export interface ImmunizationRecommendation {
  id: string;
  date: Date;
  forecastStatus: CodeableConcept;
  forecastReason: CodeableConcept;
  vaccineCode: CodeableConcept;
  recommendedStartDate: Date;
  isDeactivated: boolean;
  supportingImmunizationIds: string[];
  fulfillingImmunizationIds: string[];
  patientId: string;
  populationRecommendationId: string;
  vaccinationDoseId: string;
}
