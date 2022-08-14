import { VaccinationDoseSingle } from '../models/VaccinationDose';

export const MockVaccinationDosesSingle = new Map<
  string,
  VaccinationDoseSingle
>([
  [
    'vaccinationDoseSingle1',
    {
      id: 'vaccinationDoseSingle1',
      doseQuantity: 1,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'vaccinationscheme1',
      numberInScheme: 2,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'tetanol-pur1',
    {
      id: 'tetanol-pur1',
      doseQuantity: 0.5,
      isProtected: true,
      notes: '',
      vaccinationSchemeId: 'tetanol-pur-scheme',
      numberInScheme: 1,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'tetanol-pur2',
    {
      id: 'tetanol-pur2',
      doseQuantity: 0.5,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'tetanol-pur-scheme',
      numberInScheme: 2,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'tetanol-pur3',
    {
      id: 'tetanol-pur3',
      doseQuantity: 0.5,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'tetanol-pur-scheme',
      numberInScheme: 3,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'dukoral1',
    {
      id: 'dukoral1',
      doseQuantity: 2,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'dukoral-scheme',
      numberInScheme: 1,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'comirnaty1',
    {
      id: 'comirnaty1',
      doseQuantity: 2,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'comirnaty-scheme',
      numberInScheme: 1,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'comirnaty2',
    {
      id: 'comirnaty2',
      doseQuantity: 2,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'comirnaty-scheme',
      numberInScheme: 2,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
  [
    'comirnaty3',
    {
      id: 'comirnaty3',
      doseQuantity: 2,
      isProtected: true,
      notes: '0',
      vaccinationSchemeId: 'comirnaty-scheme',
      numberInScheme: 3,
      timeframeStart: 15,
      timeframeEnd: 30,
    },
  ],
]);
