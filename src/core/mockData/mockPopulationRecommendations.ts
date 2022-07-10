import { PopulationRecommendation } from '../models/PopulationRecommendation';

export const MockPopulationRecommendations = new Map<
  string,
  PopulationRecommendation
>([
  [
    'populationrecommendation1',
    {
      id: 'populationrecommendation1',
      ageStart: 0,
      ageEnd: 0,
      location: {
        id: 'location1',
        country: 'Germany',
        state: 'Bavaria',
        administrativeDistrict: 'Munich',
      },
      diseaseId: 'disease1',
    },
  ],
]);
