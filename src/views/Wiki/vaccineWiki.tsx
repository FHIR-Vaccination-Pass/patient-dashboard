import { Box, Divider, Heading, HStack, IconButton } from '@chakra-ui/react';
import {
  getSomeVaccinations,
  Vaccination,
} from '../../assets/models/vaccination';
import './vaccineWiki.css';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export function VaccineWiki() {
  const vaccinations: Vaccination[] = getSomeVaccinations();
  return (
    <Box style={{ marginLeft: '5px' }}>
      <Heading mb={'20px'}>Wiki</Heading>
      {vaccinations.map((vaccination) => (
        <div>
          <Divider orientation='horizontal' mb={'10px'} />
          <Link to={`/dashboard/wiki/${vaccination.name}`}>
            <HStack style={{ position: 'relative' }}>
              <Heading as='h3' size='lg'>
                {vaccination.name}
              </Heading>
              <IconButton
                className={'extend-full-height'}
                aria-label={'Get details'}
                size={'lg'}
                colorScheme='Gray'
                variant='ghost'
                icon={<ChevronRightIcon />}
                style={{ position: 'absolute', right: '0', top: '-7px' }}
              ></IconButton>
            </HStack>
          </Link>
          <Divider orientation='horizontal' mt={'10px'} />
        </div>
      ))}
    </Box>
  );
}
