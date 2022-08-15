import { Patient } from '../models';

export const MockPatients = new Map<string, Patient>([
  [
    'patient1',
    {
      id: 'patient1',
      active: true,
      name: {
        family: 'Basic',
        given: ['Kevin', 'Harald'],
      },
      gender: 'other',
      birthDate: new Date(),
      deceased: false,
      address: {
        country: 'Germany',
        countryCode: 'DE',
        state: 'Bavaria',
        stateCode: 'DE-BY',
        city: 'Munich',
        postalCode: '80799',
        line: ['Leopoldstrasse 1.'],
      },
      isPregnant: true,
      keycloakUsername: 'kevin.h.basic',
    },
  ],
]);
