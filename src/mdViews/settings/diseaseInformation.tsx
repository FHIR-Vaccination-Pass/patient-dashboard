import {
  Box,
  Divider,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import React, { useState } from 'react';
import { Disease } from '../../core/models/Disease';
import { DiseaseInformationCard } from './diseaseInformationCard';
import { AddIcon } from '@chakra-ui/icons';
import { AddDiseaseModal } from './addDiseaseModal';

export default function DiseaseInformation() {
  const mapper = useMapper();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const diseases = mapper.getAllDiseases().sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  const [currentDisease, setCurrentDisease] = useState<Disease>(diseases[0]);

  return (
    <Flex h={'100%'} flexDirection={'row'}>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'10px'}
        flexDir={'column'}
        w={'520px'}
        h={'90vh'}
        mb={'10px'}
        mr={'50px'}
        justifyContent={'space-between'}
      >
        <Flex flexDirection={'column'} overflowY={'scroll'}>
          {diseases.map((disease, i) => (
            <Flex
              h={'60px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              onClick={() => setCurrentDisease(disease)}
              bg={currentDisease === disease ? 'gray.100' : 'white'}
              textColor={currentDisease === disease ? 'gray.800' : 'gray.500'}
              cursor={'pointer'}
              borderTopRadius={i === 0 ? '10px' : '0px'}
            >
              <Text pl={'20px'}>{disease.name}</Text>
            </Flex>
          ))}
        </Flex>
        <Box>
          <Divider orientation='horizontal' mt={'5px'} />
          <Flex
            h={'60px'}
            alignItems={'center'}
            bg={'white'}
            textColor={'green.600'}
            cursor={'pointer'}
            borderBottomRadius={'10px'}
            justifyContent={'center'}
            onClick={onOpen}
          >
            <AddIcon color={'green.600'} mr={'10px'} />
            <Text justifyContent={'flex-start'}>Add Disease</Text>
            <AddDiseaseModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Box>
      </Flex>
      <DiseaseInformationCard currentDisease={currentDisease} />
    </Flex>
  );
}
