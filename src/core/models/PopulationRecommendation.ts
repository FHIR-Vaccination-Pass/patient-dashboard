import { Location } from './Location';

export interface PopulationRecommendation {
  id: string;
  ageStart: number;
  ageEnd: number;
  location: Location;
  diseaseId: string;
}
