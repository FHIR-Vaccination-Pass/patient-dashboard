import {
  Box,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useTargetDiseases } from '../../../hooks';
import React, { useState } from 'react';
import { Disease } from '../../../core/models';
import { ImmunizationInformationTab } from './immunizationInformationTab';
import { ImmunizationConfigurationTab } from './immunizationConfigurationTab';

export function PatientDiseaseRecord() {
  const { targetDiseases } = useTargetDiseases({});
  console.log(targetDiseases);
  const [currentDisease, setCurrentDisease] = useState<Disease | undefined>(
    targetDiseases?.at(0)
  );

  return (
    <Box w={'80%'} alignItems={'center'}>
      <Flex
        h={'85vh'}
        w={'100%'}
        flexDirection={'row'}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      >
        <Flex
          bg={'white'}
          borderTopLeftRadius={'10px'}
          borderBottomLeftRadius={'10px'}
          h={'100%'}
          mb={'10px'}
          flexDirection={'column'}
          w={'300px'}
        >
          {targetDiseases?.map((disease, i) => (
            <Flex
              h={'60px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              onClick={() => setCurrentDisease(disease)}
              bg={currentDisease === disease ? 'gray.100' : 'white'}
              textColor={currentDisease === disease ? 'gray.800' : 'gray.500'}
              cursor={'pointer'}
              borderTopLeftRadius={i === 0 ? '10px' : '0px'}
            >
              <Text pl={'30px'}>{disease.name}</Text>
            </Flex>
          ))}
        </Flex>
        <Divider orientation={'vertical'} />
        <Flex m={'10px 30px 0px 30px'} w={'100%'}>
          <Tabs w={'100%'}>
            <TabList>
              <Tab>Immunization Information</Tab>
              <Tab>Immunization Configuration</Tab>
            </TabList>

            <TabPanels mt={'30px'}>
              <TabPanel>
                <ImmunizationInformationTab currentDisease={currentDisease} />
              </TabPanel>
              <TabPanel>
                <ImmunizationConfigurationTab currentDisease={currentDisease} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
}
