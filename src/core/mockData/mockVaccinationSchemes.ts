import { VaccinationScheme } from '../models/VaccinationScheme';

export const MockVaccinationSchemes = new Map<string, VaccinationScheme>([
  [
    'vaccinationscheme1',
    {
      id: 'vaccinationscheme1',
      name: 'standard scheme',
      type: 'standard',
      isPreferred: true,
      ageStart: 1,
      ageEnd: 99,
      medicationId: 'medication1',
    },
  ],
]);
