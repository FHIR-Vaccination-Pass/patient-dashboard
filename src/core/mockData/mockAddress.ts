import { Address } from '../models/Address';

export const MockAddress: Map<string, Address> = new Map<string, Address>([
  [
    'address1',
    {
      id: 'address1',
      city: 'Munich',
      country: 'Germany',
      district: 'Maxvorstadt',
      line: 'Leopoldstrasse 1.',
      postalCode: '80799',
      state: 'Bavaria',
    },
  ],
]);
