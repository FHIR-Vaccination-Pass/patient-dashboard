import { CodeableConcept, Identifier } from 'fhir/r4';

export type ImmunizationStatus = 'completed' | 'entered-in-error' | 'not-done';

export interface Immunization {
  identifier: Identifier;
  status: ImmunizationStatus;
  vaccineCode: CodeableConcept;
  occurenceTime: Date;
  occurence: string;
  primarySource: boolean;
  lotNumber: string;
}
