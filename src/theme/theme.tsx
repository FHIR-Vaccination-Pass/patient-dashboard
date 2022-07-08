import { extendTheme } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// Example Colors need to be adjusted to fit the chosen theme e.g. the AviMedical CI theme
const colors = {
  brand: {
    900: '#133869',
    800: '#153e75',
    700: '#2a69ac',
    600: '#2c5183',
    500: '#446591',
    400: '#5b789e',
    300: '#738bac',
    200: '#8a9fba',
    100: '#a1b2c8',
    50: '#b9c5d6',
    25: '#d0d8e3',
    10: '#e8ecf1',
    0: '#ffffff',
  },
  aviGreen: {
    500: '#226a6d',
  },
  aviBeige: {
    900: '#ffe6ce',
  },
  background: {
    900: '#f5f5f5',
  },
};

export const theme = extendTheme({ colors });

export type VaccinationStatus =
  | 'complete'
  | 'immune'
  | 'due'
  | 'overdue'
  | 'contraindicated';

export function getColorByStatus(
  status: VaccinationStatus | undefined,
  defaultColor: string
): string {
  switch (status) {
    case 'complete':
      return 'green';
    case 'immune':
      return 'green';
    case 'due':
      return 'orange';
    case 'overdue':
      return 'red';
    case 'contraindicated':
      return 'gray';
    default:
      return defaultColor;
  }
}

export function getIconByStatus(
  status: VaccinationStatus | undefined
): IconType | undefined {
  switch (status) {
    case 'complete':
      return FaCheckCircle;
    case 'immune':
      return FaCheckCircle;
    case 'due':
      return FaExclamationTriangle;
    case 'overdue':
      return FaExclamationTriangle;
    case 'contraindicated':
      return undefined;
    default:
      return undefined;
  }
}
