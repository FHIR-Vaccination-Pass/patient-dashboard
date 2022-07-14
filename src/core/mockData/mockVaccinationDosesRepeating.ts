import { VaccinationDoseRepeating } from '../models/VaccinationDose';

export const MockVaccinationDosesRepeating = new Map<
  string,
  VaccinationDoseRepeating
>([
  [
    'vaccinationdose1',
    {
      id: 'vaccinationdose1',
      doseQuantity: 1,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'vaccinationscheme1',
      interval: [],
    },
  ],
]);
