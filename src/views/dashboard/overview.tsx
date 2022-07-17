import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import { ImmunizationStatusCard } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { RecommendationCard } from '../../components/dashboard/recommendationCard/recommendationCard';
import { ImmunizationRecommendation } from '../../core/models/ImmunizationRecommendation';
import { useMapper } from '../../core/services/server/ResourceMapperContext';

export function Overview() {
  const mapper = useMapper();
  const recommendations: ImmunizationRecommendation[] =
    mapper.getRecommendations();
  return (
    <Stack minH='100%' gap={'10px'}>
      <ImmunizationStatusCard
        recommendations={recommendations}
      ></ImmunizationStatusCard>
      <Text color={'gray.500'} mb={5}>
        Upcoming vaccinations
      </Text>
      <Stack gap={'3px'} pb={10}>
        {/* List recommendations  */}
        {recommendations.length > 0 &&
          recommendations.map((recommendation: ImmunizationRecommendation) => {
            return mapper
              .getMedicationByVaccineCode(recommendation.vaccineCode)
              ?.targetDiseaseIds.map((diseaseId: string) => (
                <RecommendationCard
                  recommendation={recommendation}
                  diseaseId={diseaseId}
                />
              ));
          })}

        {/* If no recommendations are listed */}
        {recommendations.length <= 0 && (
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
