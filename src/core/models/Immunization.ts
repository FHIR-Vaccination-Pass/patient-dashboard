import { CodeableConcept } from './CodeableConcept';

export type ImmunizationStatus = 'completed' | 'entered-in-error' | 'not-done';

export interface Immunization {
  id: string;
  status: ImmunizationStatus;
  vaccineCode: CodeableConcept;
  occurrenceTime: Date;
  occurrence: string;
  primarySource: boolean;
  lotNumber: string;
  patientId: string;
  performerId: string;
  vaccinationDoseId: string;
}
