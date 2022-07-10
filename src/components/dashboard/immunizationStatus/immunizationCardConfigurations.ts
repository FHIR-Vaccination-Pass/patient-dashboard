import { AggregatedImmunizationStatus } from '../../../core/models/AggregatedImmunizationStatus';
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaRegCheckCircle,
} from 'react-icons/fa';

export const MissingHistoryStatus: AggregatedImmunizationStatus = {
  status: 'default',
  iconColor: 'gray.500',
  icon: FaInfoCircle,
  backgroundColor: 'gray.100',
  headline: 'No immunization record',
  subline:
    'Your account is not associated with immunization data. Please contact your medical doctor.',
};

export const CompleteStatus: AggregatedImmunizationStatus = {
  status: 'complete',
  iconColor: 'green.500',
  icon: FaRegCheckCircle,
  backgroundColor: 'green.100',
  headline: 'Immunization complete',
  subline: 'You have all recommended vaccinations completed!',
};

export const DueStatus: AggregatedImmunizationStatus = {
  status: 'due',
  iconColor: 'orange.500',
  icon: FaInfoCircle,
  backgroundColor: 'orange.100',
  headline: 'Immunization due',
  subline:
    'You have vaccinations that should be completed in less then a month!',
};

export const OverdueStatus: AggregatedImmunizationStatus = {
  status: 'overdue',
  iconColor: 'red.500',
  icon: FaExclamationCircle,
  backgroundColor: 'red.100',
  headline: 'Immunization overdue',
  subline:
    'Your immunization is incomplete, please complete overdue vaccinations as soon as possible!',
};
