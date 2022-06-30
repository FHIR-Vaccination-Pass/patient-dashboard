import { AggregatedImmunizationStatus } from '../../../core/models/aggregatedImmunizationStatus';
import {
  FaInfoCircle,
  FaRegCheckCircle,
  FaRegClock,
  FaSyringe,
} from 'react-icons/fa';

export const DefaultStatus: AggregatedImmunizationStatus = {
  status: 'default',
  date: new Date(Date.UTC(1998, 3, 22)),
  iconColor: 'gray.500',
  icon: FaInfoCircle,
  backgroundColor: 'gray.100',
  headline: 'No immunization record',
  subline: 'Your account is not associated with immunization data.',
};

export const CompleteStatus: AggregatedImmunizationStatus = {
  status: 'default',
  date: new Date(Date.UTC(1998, 3, 22)),
  iconColor: 'green.500',
  icon: FaRegCheckCircle,
  backgroundColor: 'green.100',
  headline: 'Immunization complete',
  subline: 'You have all recommended vaccinations completed!',
};

export const DueStatus: AggregatedImmunizationStatus = {
  status: 'default',
  date: new Date(Date.UTC(1998, 3, 22)),
  iconColor: 'orange.500',
  icon: FaSyringe,
  backgroundColor: 'orange.100',
  headline: 'Immunization due',
  subline:
    'You have vaccinations that should be completed in less then a month!',
};

export const OverdueStatus: AggregatedImmunizationStatus = {
  status: 'default',
  date: new Date(Date.UTC(1998, 3, 22)),
  iconColor: 'red.500',
  icon: FaRegClock,
  backgroundColor: 'red.100',
  headline: 'Immunization overdue',
  subline:
    'Your immunization is incomplete, please complete overdue vaccinations as soon as possible!',
};
