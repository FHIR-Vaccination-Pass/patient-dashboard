import { HumanName } from '../models';

export const MockHumanName = new Map<string, HumanName>([
  [
    'name1',
    {
      family: 'Basic',
      given: ['Kevin', 'Harald'],
    },
  ],
]);
