import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { useState } from 'react';
import { VaccineInformationCard } from './vaccineInformationCard';
import { Medication } from '../../core/models/Medication';

export default function VaccineInformation() {
  const mapper = useMapper();
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
        w={'12%'}
        h={'100%'}
        mb={'10px'}
        flexDirection={'column'}
        mr={'50px'}
      >
        {medications.map((medication, i) => (
          <Flex
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
      <VaccineInformationCard
        justifyContent={'center'}
        selectedMedication={currentMedication}
      />
    </Flex>
  );
}
