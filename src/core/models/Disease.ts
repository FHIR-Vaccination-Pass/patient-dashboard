import { CodeableConcept } from 'fhir/r4';

export interface Disease {
  code: CodeableConcept;
  name: string;
  description: string;
}
