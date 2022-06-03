import { extendTheme } from '@chakra-ui/react';

// Example Colors need to be adjusted to fit the chosen theme e.g. the AviMedical CI theme
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#2a69ac',
    500: '#2a69ac',
    400: '#2a69ac',
    300: '#2a69ac',
    200: '#2a69ac',
    100: '#2a69ac',
    50: '#2a69ac',
    25: '#2a69ac',
    10: '#2a69ac',
    0: '#2a69ac',
  },
  aviGreen: {
    900: '#226a6d',
  },
  aviBeige: {
    900: '#ffe6ce',
  },
  background: {
    900: '#f5f5f5',
  },
};

export const theme = extendTheme({ colors });
