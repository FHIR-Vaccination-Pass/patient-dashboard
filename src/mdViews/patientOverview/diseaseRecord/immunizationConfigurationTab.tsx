import { BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Disease } from '../../../core/models/Disease';

interface ImmunizationConfigurationTabProps extends BoxProps {
  currentDisease: Disease | undefined;
}

export const ImmunizationConfigurationTab: FC<
  ImmunizationConfigurationTabProps
> = ({ currentDisease }) => {
  return <></>;
};
