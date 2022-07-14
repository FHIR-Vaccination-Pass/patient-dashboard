import { Practitioner } from '../models/Practitioner';

export const MockPractitioners = new Map<string, Practitioner>([
  [
    'practitioner1',
    {
      id: 'practitioner1',
      identifier: 'practitioneIdentifier',
      active: true,
      name: {
        id: 'name1',
        family: 'Basic',
        given: ['Kevin', 'Harald'],
        prefix: ['League of Legends Profi'],
        suffix: [],
      },
      phoneNumber: '1111111111111',
      email: 'mock.practitioner@mock.com',
      gender: 'male',
      address: {
        id: 'address1',
        city: 'Munich',
        country: 'Germany',
        district: 'Maxvorstadt',
        line: 'Leopoldstrasse 1.',
        postalCode: '80799',
        state: 'Bavaria',
      },
      qualification: {
        identifier: 'practitionerQualificationIdentifier',
        code: {
          id: 'qualificationCoding1',
          coding: 'qualificationCoding',
          text: 'ABC',
        },
        issuer: 'qualificationIssuer',
      },
    },
  ],
]);
