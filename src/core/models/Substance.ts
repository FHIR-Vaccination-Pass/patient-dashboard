import { CodeableConcept } from './CodeableConcept';

export interface Substance {
  category: CodeableConcept;
  code: CodeableConcept;
  description: string;
}
