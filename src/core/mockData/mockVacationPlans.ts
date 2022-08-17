import { VacationPlan } from '../models/VacationPlan';

export const MockVacationPlans = new Map<string, VacationPlan>([
  [
    'vaccationplan1',
    {
      id: 'vaccationplan1',
      departureDate: new Date(),
      locations: [
        {
          country: 'Germany',
          state: 'Bavaria',
        },
      ],
      patientId: 'patient1',
    },
  ],
]);
