import { extendTheme } from '@chakra-ui/react'

// Example Colors need to be adjusted to fit the chosen theme e.g. the AviMedical CI theme
const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

export const theme = extendTheme({ colors })