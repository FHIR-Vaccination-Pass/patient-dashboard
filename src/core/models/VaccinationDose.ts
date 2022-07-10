export interface VaccinationDose {
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
  interval: Array<number>;
}
