import { Practitioner } from '../models';

export const MockPractitioners = new Map<string, Practitioner>([
  [
    'practitioner1',
    {
      id: 'practitioner1',
      name: {
        family: 'Haraldson',
        given: ['Kevin'],
      },
    },
  ],
]);
