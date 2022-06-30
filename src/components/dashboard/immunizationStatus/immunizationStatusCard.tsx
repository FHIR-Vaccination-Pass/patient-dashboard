import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { AggregatedImmunizationStatus } from '../../../core/models/aggregatedImmunizationStatus';

interface ImmunizationStatusCardProps {
  status: AggregatedImmunizationStatus;
}

export const ImmunizationStatusCard: FC<ImmunizationStatusCardProps> = ({
  status,
}) => {
  let currentStatus: string = 'default';
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
