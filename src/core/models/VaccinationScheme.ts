export interface VaccinationScheme {
  id: string;
  name: string;
  type: string;
  isPreferred: boolean;
  ageStart: number;
  ageEnd: number;
  medicationId: string;
}
