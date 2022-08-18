import React, { FC } from 'react';
import { Flex, Text, Divider, Button, Icon, Stack } from '@chakra-ui/react';
import { Disease } from '../../../core/models';
import { calcAggregateImmunizationStatus } from '../../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { Link, useParams } from 'react-router-dom';
import {
  useImmunizationRecommendations,
  useTargetDiseases,
} from '../../../hooks';

export const ImportantDiseaseWidget: FC = () => {
  const params = useParams();
  const patientId = params['patientId']!;

  const { targetDiseases } = useTargetDiseases({});
  const {
    data: immunizationRecommendationsData,
    idToImmunizationRecommendation,
  } = useImmunizationRecommendations({ patient: patientId });

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'95%'}
      w={'100%'}
    >
      {targetDiseases?.map((disease: Disease) => {
        const immRecs = immunizationRecommendationsData?.byTargetDisease[
          disease.code.coding.code
        ]?.ids.map((irId) => idToImmunizationRecommendation(irId)!);
        const status = calcAggregateImmunizationStatus(immRecs ?? []);

        return (
          <Stack>
            <Flex
              justifyContent={'space-between'}
              w={'100%'}
              alignItems={'center'}
              p={6}
            >
              <Text>{disease.name}</Text>
              <Flex w={'50%'} justifyContent={'end'}>
                <Icon
                  as={status.icon}
                  color={status.iconColor}
                  w={8}
                  h={8}
                  m={'5px'}
                  mr={6}
                />
                <Link
                  to={`/md/dashboard/patient/${patientId}/diseases/${disease.id}`}
                >
                  <Button colorScheme='blue' w={'5vw'}>
                    Open
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <Divider />
          </Stack>
        );
      })}
    </Flex>
  );
};
