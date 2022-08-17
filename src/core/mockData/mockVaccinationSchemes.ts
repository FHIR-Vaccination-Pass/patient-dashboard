import { VaccinationScheme } from '../models';

export const MockVaccinationSchemes = new Map<string, VaccinationScheme>([
  [
    'vaccinationscheme1',
    {
      id: 'vaccinationscheme1',
      name: 'standard scheme',
      type: 'standard',
      isPreferred: true,
      ageStart: 1,
      ageEnd: 98,
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
      ageEnd: 98,
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
      ageEnd: 99,
      medicationId: 'dukoral',
    },
  ],
  [
    'comirnaty-scheme',
    {
      id: 'comirnaty-scheme',
      name: 'Comirnaty scheme',
      type: 'standard',
      isPreferred: true,
      ageStart: 0,
      ageEnd: 99,
      medicationId: 'comirnaty',
    },
  ],
  [
    'comirnaty-fast-scheme',
    {
      id: 'comirnaty-fast-scheme',
      name: 'Comirnaty fast scheme',
      type: 'fast',
      isPreferred: false,
      ageStart: 1,
      ageEnd: 65,
      medicationId: 'comirnaty',
    },
  ],
]);
