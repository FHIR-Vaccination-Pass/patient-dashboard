import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import _ from 'lodash';

import { VaccineInformationCard } from './vaccineInformationCard';
import { AddVaccineModal } from './addVaccineModal';
import { useMedications } from '../../hooks';

export default function VaccineInformation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { medications } = useMedications({});
  const [currentMedicationId, setCurrentMedicationId] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (medications && currentMedicationId === undefined) {
      setCurrentMedicationId(medications[0].id);
    }
  }, [medications, currentMedicationId]);

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
        {medications && (
          <Flex flexDirection={'column'} overflowY={'scroll'}>
            {_.sortBy(medications, ({ tradeName }) => tradeName).map(
              (med, i) => (
                <Flex
                  key={med.id}
                  h={'60px'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  onClick={() => setCurrentMedicationId(med.id)}
                  bg={currentMedicationId === med.id ? 'gray.100' : 'white'}
                  textColor={
                    currentMedicationId === med.id ? 'gray.800' : 'gray.500'
                  }
                  cursor={'pointer'}
                  borderTopRadius={i === 0 ? '10px' : '0px'}
                >
                  <Text pl={'20px'}>{med.tradeName}</Text>
                </Flex>
              )
            )}
          </Flex>
        )}

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
      {currentMedicationId && (
        <VaccineInformationCard medicationId={currentMedicationId} />
      )}
    </Flex>
  );
}
