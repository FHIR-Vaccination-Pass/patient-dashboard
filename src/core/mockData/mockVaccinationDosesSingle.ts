import { VaccinationDoseSingle } from '../models/VaccinationDose';

export const MockVaccinationDosesSingle = new Map<
  string,
  VaccinationDoseSingle
>([
  [
    'vaccinationdose1',
    {
      id: 'vaccinationdose1',
      doseQuantity: 1,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'vaccinationscheme1',
      numberInScheme: 2,
      timeStart: new Date(),
      timeEnd: new Date(),
    },
  ],
]);
