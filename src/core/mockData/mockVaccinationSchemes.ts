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
  [
    'tetanol-pur-scheme',
    {
      id: 'tetanol-pur-scheme',
      name: 'Tetanol scheme',
      type: 'standard',
      isPreferred: true,
      ageStart: 1,
      ageEnd: 99,
      medicationId: 'tetanol-pur',
    },
  ],
  [
    'dukoral-scheme',
    {
      id: 'dukoral-scheme',
      name: 'Dukoral scheme',
      type: 'standard',
      isPreferred: true,
      ageStart: 0,
      ageEnd: 100,
      medicationId: 'dukoral',
    },
  ],
]);
