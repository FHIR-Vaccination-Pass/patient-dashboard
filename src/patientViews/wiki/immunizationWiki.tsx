import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import {
  Disease,
  DiseaseMapper,
  ImmunizationRecommendationMapper,
} from '../../core/models';
import { calcAggregateImmunizationStatus } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import {
  immunizationRecommendationApi,
  targetDiseaseApi,
} from '../../core/services/redux/fhir';

export interface WikiInformationCardProps {
  disease: Disease;
}

export const WikiInformationCard: FC<WikiInformationCardProps> = ({
  disease,
}) => {
  const { data: immunizationRecommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery({
      'target-disease': disease.code.coding.code,
    });
  if (immunizationRecommendations === undefined) {
    return <></>;
  }

  const immunizationRecommendationsMapped = immunizationRecommendations.ids.map(
    (irId) =>
      ImmunizationRecommendationMapper.fromResource(
        immunizationRecommendations.entities[irId]
      )
  );
  const aggregateImmunizationStatus = calcAggregateImmunizationStatus(
    immunizationRecommendationsMapped
  );

  return (
    <div>
      <Link to={`/patient/dashboard/wiki/${disease.code.coding.code}`}>
        <Flex justifyContent={'space-between'} alignItems={'center'} pt={4}>
          <Text fontSize={'xl'} color={aggregateImmunizationStatus.iconColor}>
            {disease.name}
          </Text>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            {immunizationRecommendationsMapped.length > 0 && (
              <Icon
                mt={'auto'}
                mb={'auto'}
                ml='3'
                as={aggregateImmunizationStatus.icon}
                color={aggregateImmunizationStatus.iconColor}
                w={6}
                h={6}
              />
            )}
            <ChevronRightIcon ml={5} boxSize={8}></ChevronRightIcon>
          </Flex>
        </Flex>
      </Link>
      <Divider orientation='horizontal' mt={'10px'} />
    </div>
  );
};

export function ImmunizationWiki() {
  const { data: targetDiseases } = targetDiseaseApi.endpoints.get.useQuery({});
  const targetDiseasesMapped = targetDiseases?.ids.map((tdId) =>
    DiseaseMapper.fromResource(targetDiseases.entities[tdId])
  );
  const [showInfo, setShowInfo] = useBoolean();

  return (
    <Box pb={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={'20px'}>
        <Text fontSize={'2xl'} textAlign={'center'} ml={'3px'}>
          Immunization Wiki
        </Text>
        <InfoIcon
          mr={2}
          boxSize={6}
          onClick={setShowInfo.toggle}
          color={'gray.600'}
        ></InfoIcon>
      </Flex>
      {showInfo && (
        <Text mb={'15px'} ml={'5px'} color={'gray.500'}>
          All information provided in this wiki are according to the STIKO. The
          information provided is enhanced with your personal data to give you
          more insights about your immunisation.
        </Text>
      )}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'10px'}
        w={'100%'}
        mb={'10px'}
        pl={5}
        pr={5}
      >
        {targetDiseasesMapped?.map((targetDisease) => (
          <WikiInformationCard disease={targetDisease} />
        ))}
      </Box>
    </Box>
  );
}
