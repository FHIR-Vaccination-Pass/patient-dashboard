import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import { ImmunizationStatusCard } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { RecommendationCard } from '../../components/dashboard/recommendationCard/recommendationCard';
import { useImmunizationRecommendations, useMedications } from '../../hooks';

export function Overview() {
  const { immunizationRecommendations } = useImmunizationRecommendations({});
  const { data: medicationsData, idToMedication } = useMedications({});

  return (
    <Stack minH='100%' gap={'10px'}>
      <ImmunizationStatusCard
        recommendations={immunizationRecommendations}
      ></ImmunizationStatusCard>
      <Text color={'gray.500'} mb={5}>
        Upcoming vaccinations
      </Text>
      <Stack gap={'3px'} pb={10}>
        {immunizationRecommendations &&
          (immunizationRecommendations.length > 0 ? (
            immunizationRecommendations.map((immRec) => {
              const med = idToMedication(
                medicationsData?.byCode[immRec.vaccineCode.coding.code]?.ids[0]
              );

              return med?.targetDiseaseIds.map((diseaseId: string) => (
                <RecommendationCard
                  recommendation={immRec}
                  diseaseId={diseaseId}
                />
              ));
            })
          ) : (
            <Stack
              justifyContent={'space-between'}
              alignItems={'center'}
              mt={'45%'}
            >
              <Icon as={FaFolderOpen} color={'gray.200'} w={20} h={20} />
              <Box p='3'>
                <Text color={'gray.400'}>No upcoming vaccinations</Text>
              </Box>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}
