import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import { ImmunizationStatusCard } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { RecommendationCard } from '../../components/dashboard/immunizationStatus/recommendationCard';
import { MockRecommendations } from '../../core/mockData/mockRecommendation';
import { ImmunizationRecommendationRecommendation } from 'fhir/r4';

export function Overview() {
  return (
    <Stack minH='100%' gap={'10px'}>
      <ImmunizationStatusCard
        recommendations={MockRecommendations[0].recommendation}
      ></ImmunizationStatusCard>
      <Text color={'gray.500'} mb={5}>
        Upcoming vaccinations
      </Text>
      <Stack gap={'3px'} pb={10}>
        {/* List recommendations  */}
        {MockRecommendations[0].recommendation.length > 0 &&
          MockRecommendations[0].recommendation.map(
            (recommendation: ImmunizationRecommendationRecommendation) => (
              <RecommendationCard
                configuration={recommendation}
              ></RecommendationCard>
            )
          )}
        {/* If no recommendations are listed */}
        {MockRecommendations.length <= 0 && (
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
        )}
      </Stack>
    </Stack>
  );
}
