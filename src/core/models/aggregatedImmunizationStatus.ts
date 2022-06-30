import { IconType } from 'react-icons';

export interface AggregatedImmunizationStatus {
  status: string;
  date: Date;
  iconColor: string;
  icon: IconType;
  backgroundColor: string;
  headline: string;
  subline: string;
}
