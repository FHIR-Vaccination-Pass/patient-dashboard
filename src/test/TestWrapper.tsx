import { FC } from 'react';
import { theme } from '../theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const TestWrapper: FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>{children}</BrowserRouter>
  </ChakraProvider>
);

export default TestWrapper;
