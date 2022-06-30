import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import { ImmunizationStatusCard } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { RecommendationCard } from '../../components/dashboard/immunizationStatus/recommendationCard';
import {
  CompleteStatus,
  DefaultStatus,
  DueStatus,
  OverdueStatus,
} from '../../components/dashboard/immunizationStatus/immunizationCardConfigurations';
import {
  MockRecommendationProps,
  MockRecommendations,
} from '../../core/mockData/mockRecommendation';

export function Overview() {
  return (
    <Stack minH='100%' gap={'10px'}>
      <ImmunizationStatusCard status={DefaultStatus}></ImmunizationStatusCard>
      <Text color={'gray.500'} mb={5}>
        Upcoming vaccinations
      </Text>
      <Stack gap={'3px'} pb={10}>
        {/* List recommendations  */}
        {MockRecommendations.length > 0 &&
          MockRecommendations.map((recommendation: MockRecommendationProps) => (
            <RecommendationCard
              recommendation={recommendation}
            ></RecommendationCard>
          ))}
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
