import { Substance } from '../models/Substance';

export const MockSubstances = new Map<string, Substance>([
  [
    'substance1',
    {
      id: 'substance1',
      category: {
        id: 'category1',
        coding: 'category',
        text: 'ABC',
      },
      code: {
        id: 'substanceCoding1',
        coding: 'substanceCoding',
        text: 'ABC',
      },
      description: 'Description',
    },
  ],
  [
    'vibrio_cholerae_O1',
    {
      id: 'vibrio_cholerae_O1',
      category: {
        id: 'category1',
        coding: 'category',
        text: 'Vaccine suspension',
      },
      code: {
        id: 'substanceCoding1',
        coding: 'substanceCoding',
        text: 'ABC',
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
