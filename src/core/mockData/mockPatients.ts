import { Patient } from '../models/Patient';

export const MockPatients = new Map<string, Patient>([
  [
    'patient1',
    {
      id: 'patient1',
      identifier: 'Toller Ausweis',
      active: true,
      name: {
        id: 'name1',
        family: 'Basic',
        given: ['Kevin', 'Harald'],
        prefix: ['League of Legends Profi'],
        suffix: [],
      },
      email: 'mock.mail@mockmail.mock',
      phoneNumber: '1234Kartoffelsalatistan',
      gender: 'other',
      birthdate: new Date(),
      address: {
        id: 'address1',
        city: 'Munich',
        country: 'Germany',
        district: 'Maxvorstadt',
        line: 'Leopoldstrasse 1.',
        postalCode: '80799',
        state: 'Bavaria',
      },
      isPregnant: true,
      vacationPlans: [],
    },
  ],
]);
