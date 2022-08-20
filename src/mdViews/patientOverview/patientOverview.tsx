import { Box, Flex } from '@chakra-ui/react';
import { PatientSidebar } from './patientSidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export function PatientOverview() {
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex h={'100%'} w={'full'} flexDirection={'row'}>
      <PatientSidebar
        onClose={() => {
          return;
        }}
        navSize={navSize}
        changeNavSize={changeNavSize}
      ></PatientSidebar>
      <Box ml={navSize === 'small' ? '75px' : '250px'} w={'full'}>
        <Outlet></Outlet>
      </Box>
    </Flex>
  );
}
