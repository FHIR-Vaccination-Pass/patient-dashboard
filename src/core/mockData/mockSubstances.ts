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
]);
