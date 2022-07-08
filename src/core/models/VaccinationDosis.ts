export interface VaccinationDosis {
  doseQuantity: number;
  isProtected: boolean;
  notes: string;
}

export interface VaccinationDosisSingle extends VaccinationDosis {
  numberInScheme: number;
  timeStart: Date;
  timeEnd: Date;
}

export interface VaccinationDosisRepeating {
  interval: Array<number>;
}
