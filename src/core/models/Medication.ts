import { CodeableConcept } from './CodeableConcept';

export interface Medication {
  identifier: string;
  code: CodeableConcept;
  form: CodeableConcept;
  ingredientId: string; // id refers to a Substance id
  manufacturer: string; // id refers to an Organization id
  tradeName: string;
  targetDiseaseIds: string[];
}
