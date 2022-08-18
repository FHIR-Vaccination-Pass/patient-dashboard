import { ImmunizationRecommendation } from '../models';

export const MockRecommendations = new Map<string, ImmunizationRecommendation>([
  [
    'covidRecommendation1',
    {
      id: 'covidRecommendation1',
      date: new Date(),
      forecastStatus: {
        coding: {
          code: 'due',
          system: 'forecastStatusCoding',
        },
      },
      vaccineCode: {
        coding: {
          code: '2.16.840.1.113883.4.642.3.375',
          system: 'SNOMEDCTMedicationCodes',
        },
      },
      targetDisease: {
        coding: {
          code: 'comirnaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      recommendedStartDate: new Date(),
      status: 'complete',
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'covidRecommendation',
      vaccinationDoseId: 'comirnaty1',
    },
  ],
  [
    'covidRecommendation2',
    {
      id: 'covidRecommendation2',
      date: new Date(new Date().setFullYear(2022, 10, 17)),
      forecastStatus: {
        coding: {
          code: 'due',
          system: 'forecastStatusCoding',
        },
      },
      vaccineCode: {
        coding: {
          code: '2.16.840.1.113883.4.642.3.375',
          system: 'SNOMEDCTMedicationCodes',
        },
      },
      targetDisease: {
        coding: {
          code: 'comirnaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      recommendedStartDate: new Date(),
      status: 'complete',
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'covidRecommendation',
      vaccinationDoseId: 'comirnaty2',
    },
  ],
  [
    'covidRecommendation3',
    {
      id: 'covidRecommendation3',
      date: new Date(new Date().setFullYear(2023, 0, 17)),
      forecastStatus: {
        coding: {
          code: 'due',
          system: 'forecastStatusCoding',
        },
      },
      vaccineCode: {
        coding: {
          code: '2.16.840.1.113883.4.642.3.375',
          system: 'SNOMEDCTMedicationCodes',
        },
      },
      targetDisease: {
        coding: {
          code: 'comirnaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      recommendedStartDate: new Date(),
      status: 'complete',
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'covidRecommendation',
      vaccinationDoseId: 'comirnaty3',
    },
  ],
  [
    'choleraRecommendation1',
    {
      id: 'choleraRecommendation1',
      date: new Date(new Date().setFullYear(2022, 8, 17)),
      forecastStatus: {
        coding: {
          code: 'due',
          system: 'forecastStatusCoding',
        },
      },
      vaccineCode: {
        coding: {
          code: 'dukoral',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      targetDisease: {
        coding: {
          code: 'comirnaty',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      recommendedStartDate: new Date(),
      status: 'complete',
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'choleraRecommendation',
      vaccinationDoseId: 'dukoral1',
    },
  ],
]);
