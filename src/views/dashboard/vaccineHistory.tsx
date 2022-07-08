import { Chrono } from 'react-chrono';
import { mockVaccinations } from '../../core/mockData/mockVaccinations';
import { Box, Stack, Text } from '@chakra-ui/react';

export function VaccineHistory() {
  return (
    <Box overflow={'hidden'}>
      <Chrono
        mode={'VERTICAL'}
        scrollable
        theme={{
          primary: 'gray',
          secondary: 'white',
          cardBgColor: 'white',
        }}
        hideControls
        allowDynamicUpdate
      >
        {mockVaccinations.map((vaccination) => (
          <Stack>
            <Text>{vaccination.diseaseName}</Text>
          </Stack>
        ))}
      </Chrono>
    </Box>
  );
}
