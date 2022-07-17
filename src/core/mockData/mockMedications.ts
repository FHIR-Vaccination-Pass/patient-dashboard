import { Medication } from '../models/Medication';

export const MockMedications = new Map<string, Medication>([
  [
    'medication1',
    {
      id: 'medication1',
      code: {
        id: 'vaccineCoding1',
        coding: 'vaccineCoding',
        text: 'ABC',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'dukoral',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'comirnaty',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'jcovden',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'nuvaxovid',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'spikevax',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'vaxzevria',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'covid-valneva',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'td-pur',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'td-rix',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'tetagam-p',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
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
        coding: 'SNOMEDCTMedicationCodes',
        text: 'tetanol-pur',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
      },
      ingredientId: '',
      manufacturerId: 'gsk',
      tradeName: 'Tetanol pur',
      targetDiseaseIds: ['tetanus'],
    },
  ],
]);
