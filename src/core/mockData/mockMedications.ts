import { Medication } from '../models/Medication';

export const MockMedications = new Map<string, Medication>([
  [
    'medication1',
    {
      id: 'medication1',
      code: {
        id: 'medicationCoding1',
        coding: 'medicationCoding',
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
