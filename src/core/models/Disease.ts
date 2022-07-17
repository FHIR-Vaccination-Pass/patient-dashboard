import { CodeableConcept } from './CodeableConcept';

export interface Disease {
  id: string;
  code: CodeableConcept;
  name: string;
  description: string;
  populationRecommendationId: string;
  // Medication ids
  vaccineIds: string[];
}
