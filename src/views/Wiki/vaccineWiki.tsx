import { Box, Divider, Heading, HStack, IconButton } from '@chakra-ui/react';
import './vaccineWiki.css';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useGetImmunizationsQuery } from "../../core/services/immunization/immunization";
import {Immunization} from "fhir/r2";

export function VaccineWiki() {
  const immunizations: Immunization[] = useGetImmunizationsQuery();
  return (
    <Box style={{ marginLeft: '5px' }}>
      <Heading mb={'20px'}>Wiki</Heading>
      {immunizations.map((immunization) => (
        <div>
          <Divider orientation='horizontal' mb={'10px'} />
          <Link to={`/dashboard/wiki/${immunization.name}`}>
            <HStack style={{ position: 'relative' }}>
              <Heading as='h3' size='lg'>
                {immunization.name}
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
