import { VaccinationDose } from '../models/VaccinationDose';

export const MockVaccinationDoses = new Map<string, VaccinationDose>([
  [
    'vaccinationdose1',
    {
      id: 'vaccinationdose1',
      doseQuantity: 1,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'vaccinationscheme1',
    },
  ],
]);
