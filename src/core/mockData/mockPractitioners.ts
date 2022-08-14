import { Practitioner } from '../models/Practitioner';

export const MockPractitioners = new Map<string, Practitioner>([
  [
    'practitioner1',
    {
      id: 'practitioner1',
      identifier: 'practitioneIdentifier',
      active: true,
      name: {
        family: 'Haraldson',
        given: ['Kevin'],
      },
      phoneNumber: '1111111111111',
      email: 'mock.practitioner@mock.com',
      gender: 'male',
      address: {
        country: 'Germany',
        countryCode: 'DE',
        state: 'Bavaria',
        stateCode: 'DE-BY',
        city: 'Munich',
        postalCode: '80799',
        line: ['Leopoldstrasse 1.'],
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
