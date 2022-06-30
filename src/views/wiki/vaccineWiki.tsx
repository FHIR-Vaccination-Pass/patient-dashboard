import {
  Box,
  Divider,
  HStack,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  getSomeVaccinations,
  Vaccination,
} from '../../core/mockData/vaccination';
import './vaccineWiki.css';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export function VaccineWiki() {
  const vaccinations: Vaccination[] = getSomeVaccinations();
  const [showInfo, setShowInfo] = useBoolean();
  return (
    <Box>
      <HStack position={'relative'}>
        <Text fontSize={'2xl'} mb={'20px'} textAlign={'center'} ml={'3px'}>
          Immunization Wiki
        </Text>
        <InfoIcon
          boxSize={6}
          style={{
            position: 'absolute',
            right: '15px',
            top: '7px',
            marginBottom: '20px',
          }}
          onClick={setShowInfo.toggle}
        ></InfoIcon>
      </HStack>
      {showInfo && (
        <Text mb={'15px'} ml={'5px'} color={'gray.500'}>
          All information provided in this wiki are according to the STIKO. The
          information provided is enhanced with your personal data to give you
          more insights about your immunisation.
        </Text>
      )}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'10px'}
        w={'100%'}
        padding={'0px 15px 0px 15px'}
        mb={'10px'}
      >
        {vaccinations.map((vaccination) => (
          <div>
            <Divider orientation='horizontal' mb={'10px'} />
            <Link to={`/dashboard/wiki/${vaccination.code}`}>
              <HStack style={{ position: 'relative' }}>
                <Text fontSize={'2xl'}>{vaccination.name}</Text>
                <ChevronRightIcon
                  boxSize={8}
                  style={{ position: 'absolute', right: '0' }}
                ></ChevronRightIcon>
              </HStack>
            </Link>
            <Divider orientation='horizontal' mt={'10px'} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
