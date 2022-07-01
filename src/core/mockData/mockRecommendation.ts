import { PersonalImmunizationRecommendation } from '../models/personalImmunizationRecommendation';
import { SingleImmunizationRecommendation } from '../models/singleImmunizationRecommendation';

export const MockRecommendations: Array<PersonalImmunizationRecommendation> = [
  new PersonalImmunizationRecommendation(
    '01.01.1900',
    {},
    [
      new SingleImmunizationRecommendation(
        'A',
        [
          {
            code: { coding: [{ code: '30981-5' }] },
            value: '22-03-2022',
          },
        ],
        { text: '' },
        undefined,
        { text: 'Disease A' }
      ),
      new SingleImmunizationRecommendation(
        'B',
        [
          {
            code: { coding: [{ code: '30981-5' }] },
            value: '22-03-2022',
          },
        ],
        { text: 'due' },
        undefined,
        { text: 'Disease B' }
      ),
      new SingleImmunizationRecommendation(
        'A',
        [
          {
            code: { coding: [{ code: '30981-5' }] },
            value: '22-03-2022',
          },
        ],
        { text: 'overdue' },
        undefined,
        { text: 'Disease C' }
      ),
      new SingleImmunizationRecommendation(
        'A',
        [
          {
            code: { coding: [{ code: '30981-5' }] },
            value: '22-03-2022',
          },
        ],
        { text: 'due' },
        undefined,
        { text: 'Disease D' }
      ),
    ],
    'ImmunizationRecommendation'
  ),
];
