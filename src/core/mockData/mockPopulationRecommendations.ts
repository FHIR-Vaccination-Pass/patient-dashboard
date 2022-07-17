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
      locations: new Array({
        id: 'location1',
        country: 'Germany',
        state: 'Bavaria',
        administrativeDistrict: 'Munich',
      }),
      diseaseId: 'disease1',
    },
  ],
  [
    'choleraRecommendation',
    {
      id: 'choleraRecommendation',
      ageStart: 2,
      ageEnd: 65,
      locations: [
        {
          id: 'bangladesh',
          country: 'Bangladesh',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'peru',
          country: 'Peru',
          state: '',
          administrativeDistrict: '',
        },
      ],
      diseaseId: 'cholera',
    },
  ],
  [
    'covidRecommendation',
    {
      id: 'covidRecommendation',
      ageStart: 12,
      ageEnd: 100,
      locations: new Array({
        id: 'world',
        country: 'Worldwide',
        state: '',
        administrativeDistrict: '',
      }),
      diseaseId: 'covid-19',
    },
  ],
  [
    'diphtheriaRecommendation',
    {
      id: 'diphtheriaRecommendation',
      ageStart: 0,
      ageEnd: 100,
      locations: [
        {
          id: 'bangladesh',
          country: 'Bangladesh',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'indonesia',
          country: 'Indonesia',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'myanmar',
          country: 'Myanmar',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'vietnam',
          country: 'Vietnam',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'haiti',
          country: 'Haiti',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'soufth-africa',
          country: 'South Africa',
          state: '',
          administrativeDistrict: '',
        },
        {
          id: 'yemen',
          country: 'Yemen',
          state: '',
          administrativeDistrict: '',
        },
      ],
      diseaseId: 'diphtheria',
    },
  ],
]);
