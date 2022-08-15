import { VaccinationDoseRepeating } from '../models/VaccinationDose';

export const MockVaccinationDosesRepeating = new Map<
  string,
  VaccinationDoseRepeating
>([
  [
    'vaccinationdose1',
    {
      id: 'vaccinationdose1',
      type: 'repeating',
      doseQuantity: 1,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'vaccinationscheme1',
      interval: 365,
    },
  ],
]);
