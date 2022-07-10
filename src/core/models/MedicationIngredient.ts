import { CodeableConcept } from './CodeableConcept';

export interface MedicationIngredient {
    itemCodeableConcept: CodeableConcept;
    itemReference: string; // // id refers to a Substance id
}