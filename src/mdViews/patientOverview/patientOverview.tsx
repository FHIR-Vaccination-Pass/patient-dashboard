import { Flex } from '@chakra-ui/react';
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
      <Outlet></Outlet>
    </Flex>
  );
}
