import { CodeableConcept } from './CodeableConcept';

export interface Substance {
  id: string;
  category: CodeableConcept;
  code: CodeableConcept;
  description: string;
}
