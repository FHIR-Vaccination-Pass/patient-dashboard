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

import { DiseaseInformationCard } from './diseaseInformationCard';
import { AddDiseaseModal } from './addDiseaseModal';
import { useTargetDiseases } from '../../hooks';

export default function DiseaseInformation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { targetDiseases } = useTargetDiseases({});
  const [currentDiseaseId, setCurrentDiseaseId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (targetDiseases && currentDiseaseId === undefined) {
      setCurrentDiseaseId(targetDiseases[0].id);
    }
  }, [targetDiseases, currentDiseaseId]);

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
        {targetDiseases && (
          <Flex flexDirection={'column'} overflowY={'scroll'}>
            {_.sortBy(targetDiseases, ({ name }) => name).map((td, idx) => (
              <Flex
                key={td.id}
                h={'60px'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                onClick={() => setCurrentDiseaseId(td.id)}
                bg={currentDiseaseId === td.id ? 'gray.100' : 'white'}
                textColor={currentDiseaseId === td.id ? 'gray.800' : 'gray.500'}
                cursor={'pointer'}
                borderTopRadius={idx === 0 ? '10px' : '0px'}
              >
                <Text pl={'20px'}>{td.name}</Text>
              </Flex>
            ))}
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
            <Text justifyContent={'flex-start'}>Add Disease</Text>
            <AddDiseaseModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Box>
      </Flex>
      {currentDiseaseId && (
        <DiseaseInformationCard diseaseId={currentDiseaseId} />
      )}
    </Flex>
  );
}
