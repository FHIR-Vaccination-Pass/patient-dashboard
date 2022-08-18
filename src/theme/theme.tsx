import { extendTheme } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { ImmunizationRecommendationStatus } from '../core/models/ImmunizationRecommendation';

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

export function getColorByStatus(
  status: ImmunizationRecommendationStatus | undefined,
  defaultColor: string
): string {
  switch (status) {
    case 'complete':
      return 'green';
    case 'due':
      return 'orange';
    case 'overdue':
      return 'red';
    default:
      return defaultColor;
  }
}

export function getIconByStatus(
  status: ImmunizationRecommendationStatus | undefined
): IconType | undefined {
  switch (status) {
    case 'complete':
      return FaCheckCircle;
    case 'due':
      return FaExclamationTriangle;
    case 'overdue':
      return FaExclamationTriangle;
    default:
      return undefined;
  }
}
