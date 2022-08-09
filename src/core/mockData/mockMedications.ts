import { Medication } from '../models/Medication';

export const MockMedications = new Map<string, Medication>([
  [
    'medication1',
    {
      id: 'medication1',
      code: {
        id: 'vaccineCoding1',
        coding: {
          code: 'ABC',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: 'substance1',
      manufacturerId: 'organization1',
      tradeName: 'Vaccine1',
      targetDiseaseIds: ['disease1'],
    },
  ],
  [
    'dukoral',
    {
      id: 'dukoral',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'dukoral',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: 'vibrio_cholerae_O1',
      manufacturerId: 'valneva',
      tradeName: 'Dukoral',
      targetDiseaseIds: ['cholera'],
    },
  ],
  [
    'comirnaty',
    {
      id: 'comirnaty',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'corminaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'biontech-pfizer',
      tradeName: 'Comirnaty',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'jcovden',
    {
      id: 'jcovden',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'jcovden',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'janssen',
      tradeName: 'JCOVDEN',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'nuvaxovid',
    {
      id: 'nuvaxovid',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'nuvaxovid',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'novavax',
      tradeName: 'Nuvaxovid',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'spikevax',
    {
      id: 'spikevax',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'spikevax',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'moderna',
      tradeName: 'Spikevax',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'vaxzevria',
    {
      id: 'vaxzevria',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'vaxzeyria',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'astrazeneca',
      tradeName: 'Vaxzevria',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'covid-valneva',
    {
      id: 'covid-valneva',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'covid-valneva',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'valneva',
      tradeName: 'COVID-19 Vaccine Valneva',
      targetDiseaseIds: ['covid-19'],
    },
  ],
  [
    'td-pur',
    {
      id: 'td-pur',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'td-pur',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'gsk',
      tradeName: 'Td-pur',
      targetDiseaseIds: ['diphtheria', 'tetanus'],
    },
  ],
  [
    'td-rix',
    {
      id: 'td-rix',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'td-rix',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'gsk',
      tradeName: 'Td-RIX',
      targetDiseaseIds: ['diphtheria', 'tetanus'],
    },
  ],
  [
    'tetagam-p',
    {
      id: 'tetagam-p',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'tetagam-p',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'cslbehring',
      tradeName: 'TETAGAM P',
      targetDiseaseIds: ['tetanus'],
    },
  ],
  [
    'tetanol-pur',
    {
      id: 'tetanol-pur',
      code: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: {
          code: 'tetanol-pur',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        id: 'formCoding1',
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      ingredientId: '',
      manufacturerId: 'gsk',
      tradeName: 'Tetanol pur',
      targetDiseaseIds: ['tetanus'],
    },
  ],
]);
