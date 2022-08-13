import { VacationPlan } from '../models/VacationPlan';

export const MockVacationPlans = new Map<string, VacationPlan>([
  [
    'vaccationplan1',
    {
      id: 'vaccationplan1',
      departureDate: new Date(),
      location: {
        country: 'Germany',
        state: 'Bavaria',
      },
    },
  ],
]);
