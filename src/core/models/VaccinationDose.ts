export interface VaccinationDose {
  id: string;
  doseQuantity: number;
  isProtected: boolean;
  notes: string;
  vaccinationSchemeId: string;
}

export interface VaccinationDoseSingle extends VaccinationDose {
  numberInScheme: number;
  timeStart: Date;
  timeEnd: Date;
}

export interface VaccinationDoseRepeating extends VaccinationDose {
  interval: { value: { value: number; code: INTERVAL } };
}

export enum INTERVAL {
  D = 'D',
  W = 'W',
  M = 'M',
  Y = 'Y',
}
