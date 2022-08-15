import { VaccinationDoseRepeating } from '../models';

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
      interval: { code: 'mo', value: 6 },
    },
  ],
]);
