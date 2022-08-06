import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { useState } from 'react';
import { Disease } from '../../core/models/Disease';
import { DiseaseInformationCard } from './diseaseInformationCard';
import { ImmunizationConfigurationCard } from './immunizationConfigurationCard';

export default function Settings() {
  const mapper = useMapper();
  const diseases = mapper.getAllDiseases();
  const [currentDisease, setCurrentDisease] = useState<Disease>(diseases[0]);

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
      <Tabs w={'88%'}>
        <TabList>
          <Tab color={'gray.600'}>Disease Information</Tab>
          <Tab color={'gray.600'}>Immunization Configuration</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DiseaseInformationCard currentDisease={currentDisease} />
          </TabPanel>
          <TabPanel>
            <ImmunizationConfigurationCard currentDisease={currentDisease} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
