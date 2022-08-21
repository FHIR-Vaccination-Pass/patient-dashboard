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
import _ from 'lodash';

import { useTargetDiseases } from '../../../hooks';
import React, { useEffect, useState } from 'react';
import { ImmunizationInformationTab } from './immunizationInformationTab';
import { ImmunizationConfigurationTab } from './immunizationConfigurationTab';

export function PatientDiseaseRecord() {
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
    <Box w={'80%'} alignItems={'center'}>
      <Flex
        h={'85vh'}
        w={'100%'}
        flexDirection={'row'}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      >
        {targetDiseases && (
          <Flex
            bg={'white'}
            borderTopLeftRadius={'10px'}
            borderBottomLeftRadius={'10px'}
            h={'100%'}
            mb={'10px'}
            flexDirection={'column'}
            w={'300px'}
          >
            {_.sortBy(targetDiseases, ({ name }) => name).map((td, i) => (
              <Flex
                key={td.id}
                h={'60px'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                onClick={() => setCurrentDiseaseId(td.id)}
                bg={currentDiseaseId === td.id ? 'gray.100' : 'white'}
                textColor={currentDiseaseId === td.id ? 'gray.800' : 'gray.500'}
                cursor={'pointer'}
                borderTopLeftRadius={i === 0 ? '10px' : '0px'}
              >
                <Text pl={'30px'}>{td.name}</Text>
              </Flex>
            ))}
          </Flex>
        )}
        <Divider orientation={'vertical'} />
        <Flex m={'10px 30px 0px 30px'} w={'100%'}>
          {currentDiseaseId && (
            <Tabs w={'100%'}>
              <TabList>
                <Tab>Immunization Information</Tab>
                <Tab>Immunization Configuration</Tab>
              </TabList>

              <TabPanels mt={'30px'}>
                <TabPanel>
                  <ImmunizationInformationTab diseaseId={currentDiseaseId} />
                </TabPanel>
                <TabPanel>
                  <ImmunizationConfigurationTab diseaseId={currentDiseaseId} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
