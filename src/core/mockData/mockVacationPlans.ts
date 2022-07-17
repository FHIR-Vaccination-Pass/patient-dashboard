import { VacationPlan } from '../models/VacationPlan';

export const MockVacationPlans = new Map<string, VacationPlan>([
  [
    'vaccationplan1',
    {
      id: 'vaccationplan1',
      departureDate: new Date(),
      location: {
        id: 'location1',
        country: 'Germany',
        state: 'Bavaria',
        administrativeDistrict: 'Munich',
      },
    },
  ],
]);
