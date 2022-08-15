import { Medication } from '../models/Medication';

export const MockMedications = new Map<string, Medication>([
  [
    'medication1',
    {
      id: 'medication1',
      code: {
        coding: {
          code: 'ABC',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
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
        coding: {
          code: 'dukoral',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
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
        coding: {
          code: 'comirnaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'biontech-pfizer',
      tradeName: 'Comirnaty',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'jcovden',
    {
      id: 'jcovden',
      code: {
        coding: {
          code: 'jcovden',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'janssen',
      tradeName: 'JCOVDEN',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'nuvaxovid',
    {
      id: 'nuvaxovid',
      code: {
        coding: {
          code: 'nuvaxovid',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'novavax',
      tradeName: 'Nuvaxovid',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'spikevax',
    {
      id: 'spikevax',
      code: {
        coding: {
          code: 'spikevax',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'moderna',
      tradeName: 'Spikevax',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'vaxzevria',
    {
      id: 'vaxzevria',
      code: {
        coding: {
          code: 'vaxzeyria',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'astrazeneca',
      tradeName: 'Vaxzevria',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'covid-valneva',
    {
      id: 'covid-valneva',
      code: {
        coding: {
          code: 'covid-valneva',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'valneva',
      tradeName: 'COVID-19 Vaccine Valneva',
      targetDiseaseIds: ['U07.1'],
    },
  ],
  [
    'td-pur',
    {
      id: 'td-pur',
      code: {
        coding: {
          code: 'td-pur',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
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
        coding: {
          code: 'td-rix',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
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
        coding: {
          code: 'tetagam-p',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
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
        coding: {
          code: 'tetanol-pur',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      form: {
        coding: {
          code: 'form',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      manufacturerId: 'gsk',
      tradeName: 'Tetanol pur',
      targetDiseaseIds: ['tetanus'],
    },
  ],
]);
