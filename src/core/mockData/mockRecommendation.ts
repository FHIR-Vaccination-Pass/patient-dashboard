import { ImmunizationRecommendation } from '../models/immunizationRecommendation';

export const MockRecommendations: Array<ImmunizationRecommendation> = [
  {
    status: 'default',
    diseaseName: 'Disease A',
    due: new Date(Date.UTC(2022, 3, 22)),
    backgroundColor: 'gray.200',
    code: 'AAA',
  },
  {
    status: 'complete',
    diseaseName: 'Disease B',
    due: new Date(Date.UTC(2022, 3, 22)),
    backgroundColor: 'green.200',
    code: 'BBB',
  },
  {
    status: 'due',
    diseaseName: 'Disease C',
    due: new Date(Date.UTC(2022, 3, 22)),
    backgroundColor: 'orange.200',
    code: 'CCC',
  },
  {
    status: 'overdue',
    diseaseName: 'Disease D',
    due: new Date(Date.UTC(2022, 3, 22)),
    backgroundColor: 'red.400',
    code: 'DDD',
  },
];
