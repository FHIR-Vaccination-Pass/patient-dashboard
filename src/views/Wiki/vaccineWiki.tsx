import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import {
  getSomeVaccinations,
  Vaccination,
} from '../../assets/models/vaccination';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

export function VaccineWiki() {
  const vaccinations: Vaccination[] = getSomeVaccinations();
  return (
    <Box style={{ marginLeft: '5px' }}>
      <Heading mb={'20px'}>Wiki</Heading>
      {vaccinations.map((vaccination) => (
        <Fragment key={vaccination.name}>
          <Divider mb={'10px'} />
          <Link to={`/dashboard/wiki/${vaccination.name}`}>
            <HStack>
              <Text>{vaccination.name}</Text>
              <ChevronRightIcon />
            </HStack>
          </Link>
          <Divider mt={'10px'} />
        </Fragment>
      ))}
    </Box>
  );
}
