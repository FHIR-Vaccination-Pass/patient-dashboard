import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useTargetDiseases } from '../../../hooks';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

export function PatientDiseaseRecord() {
  const { targetDiseases } = useTargetDiseases({});
  const [currentDiseaseId, setCurrentDiseaseId] = useState<string | undefined>(
    undefined
  );
  const params = useParams();
  const diseaseId = params['diseaseId']!;

  useEffect(() => {
    if (targetDiseases && currentDiseaseId === undefined) {
      if (diseaseId !== undefined) {
        setCurrentDiseaseId(diseaseId);
      } else setCurrentDiseaseId(targetDiseases[0].id);
    }
  }, [targetDiseases, currentDiseaseId]);

  return (
    <Box pl={6} alignItems={'center'}>
      <Flex
        h={'85vh'}
        flexDirection={'row'}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'15px'}
      >
        {targetDiseases && (
          <Flex
            bg={'white'}
            borderTopLeftRadius={'10px'}
            borderBottomLeftRadius={'10px'}
            h={'100%'}
            mb={'10px'}
            flexDirection={'column'}
            w={'20%'}
          >
            {_.sortBy(targetDiseases, ({ name }) => name).map((td, i) => (
              <Link
                to={currentDiseaseId ?? ''}
                onClick={() => {
                  setCurrentDiseaseId(td.id);
                  console.log(currentDiseaseId);
                }}
              >
                <Flex
                  key={td.id}
                  h={'60px'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  bg={currentDiseaseId === td.id ? 'gray.100' : 'white'}
                  textColor={
                    currentDiseaseId === td.id ? 'gray.800' : 'gray.500'
                  }
                  cursor={'pointer'}
                  borderTopLeftRadius={i === 0 ? '10px' : '0px'}
                >
                  <Text pl={'30px'}>{td.name}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        )}
        <Divider orientation={'vertical'} />
        <Flex p={'10px 30px 0px 30px'} w={'80%'}>
          {currentDiseaseId && (
            <Box w={'100%'}>
              <Outlet></Outlet>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
