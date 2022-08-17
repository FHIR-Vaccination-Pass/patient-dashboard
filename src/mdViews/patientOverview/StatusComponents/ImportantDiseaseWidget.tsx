import React, { FC } from 'react';
import {
  Badge,
  Flex,
  useColorModeValue,
  Text,
  Divider,
  Button,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { useMapper } from '../../../core/services/resourceMapper/ResourceMapperContext';
import {
  AggregatedImmunizationStatus,
  Disease,
  DiseaseMapper,
  ImmunizationRecommendationMapper,
  Patient,
} from '../../../core/models';
import {
  immunizationRecommendationApi,
  targetDiseaseApi,
} from '../../../core/services/redux/fhir';
import { calcAggregateImmunizationStatus } from '../../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { DefaultStatus } from '../../../components/dashboard/immunizationStatus/immunizationCardConfigurations';
import { Link, useParams } from 'react-router-dom';

export const ImportantDiseaseWidget: FC = ({}) => {
  const params = useParams();
  const mapper = useMapper();
  const patient: Patient | undefined = mapper.getPatientById(
    params['patientId'] || ''
  );

  const { data: diseases } = targetDiseaseApi.endpoints.get.useQuery({});
  if (diseases === undefined) {
    return <></>;
  }
  const diseasesMapped = diseases.ids.map((diseaseId) =>
    DiseaseMapper.fromResource(diseases.entities[diseaseId])
  );
  console.log(diseasesMapped);

  let map: Map<string, AggregatedImmunizationStatus> = new Map();

  diseasesMapped.map((disease) => {
    map.set(disease.id, getAggregateStatus(disease));
  });

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'95%'}
      w={'100%'}
    >
      {diseasesMapped.map((disease: Disease) => (
        <Stack>
          <Flex
            justifyContent={'space-between'}
            w={'100%'}
            alignItems={'center'}
            p={6}
          >
            <Text>{disease.name}</Text>
            <Flex w={'50%'} justifyContent={'end'}>
              <Icon
                as={map.get(disease.id)?.icon}
                color={map.get(disease.id)?.iconColor}
                w={8}
                h={8}
                m={'5px'}
                mr={6}
              />
              <Link
                to={`/md/dashboard/patient/${patient?.id}/diseases/${disease.id}`}
              >
                <Button colorScheme='blue' w={'5vw'}>
                  Open
                </Button>
              </Link>
            </Flex>
          </Flex>
          <Divider />
        </Stack>
      ))}
    </Flex>
  );
};

function getAggregateStatus(disease: Disease): AggregatedImmunizationStatus {
  const { data: immunizationRecommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery({
      'target-disease': disease.code.coding.code,
    });
  if (immunizationRecommendations === undefined) {
    return DefaultStatus;
  }

  const immunizationRecommendationsMapped = immunizationRecommendations.ids.map(
    (irId) =>
      ImmunizationRecommendationMapper.fromResource(
        immunizationRecommendations.entities[irId]
      )
  );
  return calcAggregateImmunizationStatus(immunizationRecommendationsMapped);
}
