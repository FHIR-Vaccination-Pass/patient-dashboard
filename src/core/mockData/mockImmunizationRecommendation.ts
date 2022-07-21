import { ImmunizationRecommendation } from '../models/ImmunizationRecommendation';

export const MockRecommendations = new Map<string, ImmunizationRecommendation>([
  [
    'covidRecommendation1',
    {
      id: 'covidRecommendation1',
      date: new Date(),
      forecastStatus: {
        id: 'forecastStatusCoding',
        coding: 'forecastStatusCoding',
        text: 'due',
      },
      forecastReason: {
        id: 'forecastReasonCoding1',
        coding: 'forecastReasonCoding',
        text: 'He fucked up, that simple',
      },
      vaccineCode: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: 'SNOMEDCTMedicationCodes',
        text: 'comirnaty',
      },
      recommendedStartDate: new Date(),
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
        id: 'forecastStatusCoding',
        coding: 'forecastStatusCoding',
        text: '',
      },
      forecastReason: {
        id: 'forecastReasonCoding1',
        coding: 'forecastReasonCoding',
        text: 'He fucked up, that simple',
      },
      vaccineCode: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: 'SNOMEDCTMedicationCodes',
        text: 'comirnaty',
      },
      recommendedStartDate: new Date(),
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
        id: 'forecastStatusCoding',
        coding: 'forecastStatusCoding',
        text: '',
      },
      forecastReason: {
        id: 'forecastReasonCoding1',
        coding: 'forecastReasonCoding',
        text: 'He fucked up, that simple',
      },
      vaccineCode: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: 'SNOMEDCTMedicationCodes',
        text: 'comirnaty',
      },
      recommendedStartDate: new Date(),
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
        id: 'forecastStatusCoding',
        coding: 'forecastStatusCoding',
        text: '',
      },
      forecastReason: {
        id: 'forecastReasonCoding1',
        coding: 'forecastReasonCoding',
        text: 'He fucked up, that simple',
      },
      vaccineCode: {
        id: '2.16.840.1.113883.4.642.3.375',
        coding: 'SNOMEDCTMedicationCodes',
        text: 'dukoral',
      },
      recommendedStartDate: new Date(),
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'choleraRecommendation',
      vaccinationDoseId: 'dukoral1',
    },
  ],
]);
