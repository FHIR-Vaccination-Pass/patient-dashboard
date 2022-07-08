import {
  CodeableConcept,
  Identifier,
  MedicationIngredient,
  Reference,
} from 'fhir/r4';

export interface Medication {
  identifier: Identifier;
  code: CodeableConcept;
  form: CodeableConcept;
  ingredient: MedicationIngredient;
  manufacturer: Reference;
  tradeName: string;
}
