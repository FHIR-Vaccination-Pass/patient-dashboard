import {
  Box,
  Divider,
  Flex,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  getSomeVaccinations,
  Vaccination,
} from '../../core/mockData/vaccination';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export function VaccineWiki() {
  const vaccinations: Vaccination[] = getSomeVaccinations();
  const [showInfo, setShowInfo] = useBoolean();
  return (
    <Box pb={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={'20px'}>
        <Text fontSize={'2xl'} textAlign={'center'} ml={'3px'}>
          Immunization Wiki
        </Text>
        <InfoIcon mr={2} boxSize={6} onClick={setShowInfo.toggle}></InfoIcon>
      </Flex>
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
        mb={'10px'}
        pl={5}
        pr={5}
      >
        {vaccinations.map((vaccination) => (
          <div>
            <Link to={`/dashboard/wiki/${vaccination.code}`}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                pt={4}
              >
                <Text fontSize={'xl'}>{vaccination.name}</Text>
                <ChevronRightIcon boxSize={8}></ChevronRightIcon>
              </Flex>
            </Link>
            <Divider orientation='horizontal' mt={'10px'} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
