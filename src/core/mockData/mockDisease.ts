import { Disease } from '../models/Disease';

export const MockDisease = new Map<string, Disease>([
  [
    'disease1',
    {
      id: 'disease1',
      code: {
        id: 'icd10standard',
        coding: 'ICD-10',
        text: 'X00',
      },
      name: 'Disease 1',
      description: 'This disease is not good for you :(',
      populationRecommendationId: 'populationrecommendation1',
      vaccineIds: ['vaccine1'],
    },
  ],
]);
