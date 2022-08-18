import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  CompleteStatus,
  DefaultStatus,
  DueStatus,
  OverdueStatus,
} from './immunizationCardConfigurations';
import {
  AggregatedImmunizationStatus,
  ImmunizationRecommendation,
} from '../../../core/models';

interface ImmunizationStatusCardProps {
  recommendations?: ImmunizationRecommendation[];
}

export const ImmunizationStatusCard: FC<ImmunizationStatusCardProps> = ({
  recommendations,
}) => {
  let status: AggregatedImmunizationStatus = calcAggregateImmunizationStatus(
    recommendations ?? []
  );
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

export function calcAggregateImmunizationStatus(
  recommendations: ImmunizationRecommendation[]
): AggregatedImmunizationStatus {
  if (recommendations.length <= 0) {
    return DefaultStatus;
  }
  if (recommendations.some(({ status }) => status === 'overdue')) {
    return OverdueStatus;
  }
  if (recommendations.some(({ status }) => status === 'due')) {
    return DueStatus;
  }

  return CompleteStatus;
}
