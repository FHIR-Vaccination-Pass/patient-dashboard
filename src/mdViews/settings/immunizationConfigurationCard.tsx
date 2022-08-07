import { BoxProps, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Disease } from '../../core/models/Disease';

interface ImmunizationConfigurationCardProps extends BoxProps {
  currentDisease: Disease;
}

export const ImmunizationConfigurationCard: FC<
  ImmunizationConfigurationCardProps
> = ({ currentDisease }) => {
  return (
    <Flex>
      <Text>{currentDisease.description}</Text>
    </Flex>
  );
};
