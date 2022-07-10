import { Immunization } from '../models/Immunization';

export const mockImmunizations = new Map<string, Immunization>([
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
      performerId: 'performer1',
      vaccinationDoseId: 'vaccinationDoseSingle1',
    },
  ],
]);
