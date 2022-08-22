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
import { VaccineInformationCard } from './vaccineInformationCard';
import { Medication } from '../../core/models/Medication';
import { AddIcon } from '@chakra-ui/icons';
import { AddVaccineModal } from './addVaccineModal';

export default function VaccineInformation() {
  const mapper = useMapper();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const medications = mapper.getAllMedications().sort((a, b) => {
    return a.tradeName > b.tradeName ? 1 : -1;
  });
  const [currentMedication, setCurrentMedication] = useState<Medication>(
    medications[0]
  );

  return (
    <Flex h={'100%'} flexDirection={'row'}>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'10px'}
        w={'300px'}
        h={'100%'}
        mb={'10px'}
        flexDirection={'column'}
        mr={'50px'}
        justifyContent={'space-between'}
      >
        <Flex flexDirection={'column'} overflowY={'scroll'}>
          {medications.map((medication, i) => (
            <Flex
              key={medication.id}
              h={'60px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              onClick={() => setCurrentMedication(medication)}
              bg={currentMedication === medication ? 'gray.100' : 'white'}
              textColor={
                currentMedication === medication ? 'gray.800' : 'gray.500'
              }
              cursor={'pointer'}
              borderTopRadius={i === 0 ? '10px' : '0px'}
            >
              <Text pl={'20px'}>{medication.tradeName}</Text>
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
            <Text justifyContent={'flex-start'}>Add Vaccine</Text>
            <AddVaccineModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Box>
      </Flex>
      <VaccineInformationCard selectedMedication={currentMedication} />
    </Flex>
  );
}
