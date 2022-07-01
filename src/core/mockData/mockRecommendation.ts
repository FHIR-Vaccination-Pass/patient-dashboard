import { ImmunizationRecommendation } from '../models/immunizationRecommendation';

export const MockRecommendations: Array<ImmunizationRecommendation> = [
  new ImmunizationRecommendation(
    'A',
    [
      {
        code: { coding: [{ code: '30981-5' }] },
        value: '22-03-2022',
      },
    ],
    { text: 'complete' },
    undefined,
    { text: 'Disease A' },
    false
  ),
  new ImmunizationRecommendation(
    'B',
    [
      {
        code: { coding: [{ code: '30981-5' }] },
        value: '22-03-2022',
      },
    ],
    { text: 'due' },
    undefined,
    { text: 'Disease B' },
    false
  ),
  new ImmunizationRecommendation(
    'A',
    [
      {
        code: { coding: [{ code: '30981-5' }] },
        value: '22-03-2022',
      },
    ],
    { text: 'overdue' },
    undefined,
    { text: 'Disease C' },
    false
  ),
  new ImmunizationRecommendation(
    'A',
    [
      {
        code: { coding: [{ code: '30981-5' }] },
        value: '22-03-2022',
      },
    ],
    { text: 'due' },
    undefined,
    { text: 'Disease D' },
    false
  ),
];
