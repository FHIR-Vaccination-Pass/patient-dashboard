import { HumanName } from '../models/HumanName';

export const MockHumanName = new Map<string, HumanName>([
  [
    'name1',
    {
      id: 'name1',
      family: 'Basic',
      given: ['Kevin', 'Harald'],
      prefix: ['League of Legends Profi'],
      suffix: [],
    },
  ],
]);
