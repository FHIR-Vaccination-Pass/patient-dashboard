import { Organization } from '../models';

export const MockOrganizations = new Map<string, Organization>([
  [
    'organization1',
    {
      id: 'organization1',
      name: 'Fancy Org',
    },
  ],
  [
    'valneva',
    {
      id: 'valneva',
      name: 'Valneva',
    },
  ],
  [
    'astrazeneca',
    {
      id: 'astrazeneca',
      name: 'AstraZeneca',
    },
  ],
  [
    'moderna',
    {
      id: 'moderna',
      name: 'Moderna',
    },
  ],
  [
    'novavax',
    {
      id: 'novavax',
      name: 'Novavax',
    },
  ],
  [
    'janssen',
    {
      id: 'janssen',
      name: 'Janssen',
    },
  ],
  [
    'biontech-pfizer',
    {
      id: 'biontech-pfizer',

      name: 'BionTech Pfizer',
    },
  ],
  [
    'gsk',
    {
      id: 'gsk',

      name: 'gsk',
    },
  ],
  [
    'cslbehring',
    {
      id: 'cslbehring',

      name: 'CSL Behring',
    },
  ],
]);
