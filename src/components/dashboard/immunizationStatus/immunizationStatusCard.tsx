import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { AggregatedImmunizationStatus } from '../../../core/models/aggregatedImmunizationStatus';
import {
  CompleteStatus,
  DueStatus,
  MissingHistoryStatus,
  OverdueStatus,
} from './immunizationCardConfigurations';
import { ImmunizationRecommendationRecommendation } from 'fhir/r4';

interface ImmunizationStatusCardProps {
  recommendations: ImmunizationRecommendationRecommendation[];
}

export const ImmunizationStatusCard: FC<ImmunizationStatusCardProps> = ({
  recommendations,
}) => {
  let status: AggregatedImmunizationStatus =
    calcAggregateImmunizationStatus(recommendations);
  return (
    <Flex
      bg={status.backgroundColor}
      borderRadius={6}
      w={'100%'}
      h={'120px'}
      justifyContent={'left'}
      alignItems={'center'}
    >
      <Icon
        as={status.icon}
        color={status.iconColor}
        w={10}
        h={10}
        m={'20px'}
      />
      <Stack pr={5}>
        <Text fontWeight='bold' color={'gray.700'}>
          {status.headline}
        </Text>
        <Text color={'gray.700'}>{status.subline}</Text>
      </Stack>
    </Flex>
  );
};

function calcAggregateImmunizationStatus(
  recommendations: ImmunizationRecommendationRecommendation[]
): AggregatedImmunizationStatus {
  // If no recommendations or no recomendation status fields set, then immunization complete
  let aggregatedImmunizationStatus = CompleteStatus;
  // Do later: Check history and recommendations to set missing history status
  let currentStatus: string | undefined = '';
  recommendations.forEach(
    (recommendation: ImmunizationRecommendationRecommendation) => {
      currentStatus = recommendation.forecastStatus.text;
      // When current status is undefined then don't change anything.
      console.log('currentStatus: ' + currentStatus);
      if (currentStatus !== undefined) {
        // Due > Complete & MissingHistory
        if (
          currentStatus === 'due' &&
          (aggregatedImmunizationStatus === CompleteStatus ||
            aggregatedImmunizationStatus === MissingHistoryStatus)
        ) {
          aggregatedImmunizationStatus = DueStatus;
          // Overdue > all else
        } else if (currentStatus === 'overdue') {
          aggregatedImmunizationStatus = OverdueStatus;
          // Complete = complete or immune or contraindicated
        } else if (
          aggregatedImmunizationStatus !== OverdueStatus &&
          aggregatedImmunizationStatus !== DueStatus
        ) {
          aggregatedImmunizationStatus = CompleteStatus;
        }
      }
    }
  );
  console.log(aggregatedImmunizationStatus);
  return aggregatedImmunizationStatus;
}
