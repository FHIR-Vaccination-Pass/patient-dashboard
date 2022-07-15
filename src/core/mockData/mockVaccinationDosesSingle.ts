import { VaccinationDoseSingle } from '../models/VaccinationDose';

export const MockVaccinationDosesSingle = new Map<
  string,
  VaccinationDoseSingle
>([
  [
    'vaccinationDoseSingle1',
    {
      id: 'vaccinationDoseSingle1',
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
