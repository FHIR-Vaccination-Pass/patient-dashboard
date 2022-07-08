export interface VaccinationScheme {
  name: string;
  type: string;
  isPreferred: boolean;
  ageStart: number;
  ageEnd: number;
}
