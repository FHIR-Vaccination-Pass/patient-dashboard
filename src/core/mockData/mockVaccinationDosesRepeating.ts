import { INTERVAL, VaccinationDoseRepeating } from '../models/VaccinationDose';

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
      notes: 'Notes',
      vaccinationSchemeId: 'vaccinationscheme1',
      interval: { value: { value: 6, code: INTERVAL.M } },
    },
  ],
]);
