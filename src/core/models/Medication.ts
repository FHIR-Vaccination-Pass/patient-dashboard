import { CodeableConcept } from './CodeableConcept';
import { MedicationIngredient } from './MedicationIngredient';

export interface Medication {
  identifier: string;
  code: CodeableConcept;
  form: CodeableConcept;
  ingredient: MedicationIngredient;
  manufacturer: string; // id refers to an Organization id
  tradeName: string;
}
