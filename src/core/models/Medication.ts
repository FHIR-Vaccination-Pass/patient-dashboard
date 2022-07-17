import { CodeableConcept } from './CodeableConcept';

export interface Medication {
  id: string;
  code: CodeableConcept;
  form: CodeableConcept;
  ingredientId: string; // id refers to a Substance id
  manufacturerId: string; // id refers to an Organization id
  tradeName: string;
  targetDiseaseIds: string[];
}
