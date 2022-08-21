import { BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { DiseaseMapper } from '../../../core/models';
import { targetDiseaseApi } from '../../../core/services/redux/fhir';

interface ImmunizationConfigurationTabProps extends BoxProps {
  diseaseId: string;
}

export const ImmunizationConfigurationTab: FC<
  ImmunizationConfigurationTabProps
> = ({ diseaseId }) => {
  const { data: tdRaw } =
    targetDiseaseApi.endpoints.getById.useQuery(diseaseId);
  const currentDisease = DiseaseMapper.fromResource(tdRaw);

  return <></>;
};
