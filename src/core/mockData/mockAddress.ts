import { Address } from '../models/Address';

export const MockAddress: Map<string, Address> = new Map<string, Address>([
  [
    'address1',
    {
      country: 'Germany',
      countryCode: 'DE',
      state: 'Bavaria',
      stateCode: 'DE-BY',
      city: 'Munich',
      postalCode: '80799',
      line: ['Leopoldstrasse 1.'],
    },
  ],
]);
