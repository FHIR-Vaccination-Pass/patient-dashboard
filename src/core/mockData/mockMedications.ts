import { Medication } from '../models/Medication';

export const MockMedications = new Map<string, Medication>([
  [
    'vaccine1',
    {
      id: 'vaccine1',
      code: {
        id: 'vaccineCoding1',
        coding: 'vaccineCoding',
        text: 'ABC',
      },
      form: {
        id: 'formCoding1',
        coding: 'formCoding',
        text: 'form',
      },
      ingredientId: 'ingredient1',
      manufacturer: 'organization1',
      tradeName: 'Vaccine1',
      targetDiseaseIds: ['disease1'],
    },
  ],
]);
