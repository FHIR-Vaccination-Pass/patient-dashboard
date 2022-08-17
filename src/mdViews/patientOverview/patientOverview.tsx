import { Box, Flex } from '@chakra-ui/react';
import { PatientSidebar } from './patientSidebar';
import { Outlet } from 'react-router-dom';

export function PatientOverview() {
  return (
    <Flex h={'100%'} w={'full'} flexDirection={'row'}>
      <PatientSidebar
        onClose={() => {
          return;
        }}
      ></PatientSidebar>
      <Box ml={'250px'} w={'full'}>
        <Outlet></Outlet>
      </Box>
    </Flex>
  );
}
