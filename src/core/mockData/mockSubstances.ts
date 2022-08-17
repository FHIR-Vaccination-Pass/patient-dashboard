import { Substance } from '../models';

export const MockSubstances = new Map<string, Substance>([
  [
    'substance1',
    {
      category: {
        coding: {
          code: 'ABC',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      code: {
        coding: {
          code: 'ABC',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      description: 'Description',
    },
  ],
  [
    'vibrio_cholerae_O1',
    {
      category: {
        coding: {
          code: 'Vaccine suspension',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      code: {
        coding: {
          code: 'ABC',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      description:
        'Vibrio cholerae O1 Inaba, klassischer\n' +
        'Biotyp (hitzeinaktiviert)\n' +
        ' 31,25 × 109 Bakterien*\n' +
        'Vibrio cholerae O1 Inaba, El Tor-Biotyp\n' +
        '(formalininaktiviert)\n' +
        ' 31,25 × 109 Bakterien*\n' +
        'Vibrio cholerae O1 Ogawa, klassischer\n' +
        'Biotyp (hitzeinaktiviert)\n' +
        ' 31,25 × 109 Bakterien*\n' +
        'Vibrio cholerae O1 Ogawa, klassischer\n' +
        'Biotyp (formalininaktiviert)\n' +
        ' 31,25 × 109 Bakterien*',
    },
  ],
]);
