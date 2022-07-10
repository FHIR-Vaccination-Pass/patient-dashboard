import { CodeableConcept } from './CodeableConcept';

export interface Disease {
  code: CodeableConcept;
  name: string;
  description: string;
  populationRecommendationId: string;
  vaccineIds: string[];
}
