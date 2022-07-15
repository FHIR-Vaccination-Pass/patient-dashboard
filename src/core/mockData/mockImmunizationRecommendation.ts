import { ImmunizationRecommendation } from '../models/ImmunizationRecommendation';

export const MockRecommendations = new Map<string, ImmunizationRecommendation>([
  [
    'immunizationRecommendation1',
    {
      id: 'immunizationRecommendation1',
      date: new Date(),
      forecastStatus: {
        id: 'forecastStatusCoding1',
        coding: 'forecastStatusCoding',
        text: 'overdue',
      },
      forecastReason: {
        id: 'forecastReasonCoding1',
        coding: 'forecastReasonCoding',
        text: 'He fucked up, that simple',
      },
      vaccineCode: {
        id: 'vaccineCoding1',
        coding: 'vaccineCoding',
        text: 'ABC',
      },
      recommendedStartDate: new Date(),
      isDeactivated: false,
      supportingImmunizationIds: [],
      fulfillingImmunizationIds: [],
      patientId: 'patient1',
      populationRecommendationId: 'populationRecommendation1',
    },
  ],
]);
