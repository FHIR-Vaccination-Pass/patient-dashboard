import { Immunization } from '../models/Immunization';

export const MockImmunizations = new Map<string, Immunization>([
  [
    'immunization1',
    {
      id: 'immunization1',
      status: 'completed',
      vaccineCode: {
        id: 'vaccineCoding1',
        coding: 'vaccineCoding',
        text: 'ABC',
      },
      occurrenceTime: new Date(),
      occurrence: 'it occured',
      primarySource: true,
      lotNumber: 'ABCDEF',
      patientId: 'patient1',
      performerId: 'practitioner1',
      vaccinationDoseId: 'vaccinationDoseSingle1',
    },
  ],
]);
