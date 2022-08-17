import React, { FC } from 'react';
import {
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useMapper } from '../../../core/services/resourceMapper/ResourceMapperContext';
import {
  AggregatedImmunizationStatus,
  Disease,
  DiseaseMapper,
  ImmunizationRecommendation,
  ImmunizationRecommendationMapper,
  Patient,
  PopulationRecommendationMapper,
} from '../../../core/models';
import {
  immunizationRecommendationApi,
  populationRecommendationApi,
  targetDiseaseApi,
} from '../../../core/services/redux/fhir';
import { DefaultStatus } from '../../../components/dashboard/immunizationStatus/immunizationCardConfigurations';
import { calcAggregateImmunizationStatus } from '../../../components/dashboard/immunizationStatus/immunizationStatusCard';

export const RecommendationsWidget: FC = ({}) => {
  const params = useParams();
  const mapper = useMapper();
  const patient: Patient | undefined = mapper.getPatientById(
    params['patientId'] || ''
  );

  const { data: recommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery({});
  if (recommendations === undefined) {
    return <></>;
  }
  const recommendationsMapped = recommendations.ids.map((recommendationId) =>
    DiseaseMapper.fromResource(recommendations.entities[recommendationId])
  );

  let map: Map<string, Disease | undefined> = new Map();

  recommendationsMapped.map((recommendation: ImmunizationRecommendation) => {
    map.set(recommendation.id, getDiseaseForRecommendation(recommendation));
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

function getDiseaseForRecommendation(
  recommendation: ImmunizationRecommendation
): Disease | undefined {
  const { data: populationRecommendation } =
    populationRecommendationApi.endpoints.getById.useQuery(
      recommendation.populationRecommendationId
    );
  if (populationRecommendation === undefined) {
    return undefined;
  }

  const populationRecommendationMapped =
    PopulationRecommendationMapper.fromResource(populationRecommendation);

  const { data: disease } = targetDiseaseApi.endpoints.getById.useQuery(
    populationRecommendationMapped?.id
  );
  return DiseaseMapper.fromResource(disease);
}
