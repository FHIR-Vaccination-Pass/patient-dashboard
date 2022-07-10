import { Organization } from '../models/Organization';

export const MockOrganizations = new Map<string, Organization>([
  [
    'organization1',
    {
      id: 'organization1',
      name: 'Fancy Org',
    },
  ],
]);
