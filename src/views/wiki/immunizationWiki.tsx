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
import { Disease, DiseaseMapper } from '../../core/models/Disease';
import { calcAggregateImmunizationStatus } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { targetDiseaseApi } from '../../core/services/redux/fhir/targetDiseaseApi';
import { immunizationRecommendationApi } from '../../core/services/redux/fhir/immunizationRecommendationApi';
import { ImmunizationRecommendationMapper } from '../../core/models/ImmunizationRecommendation';

export interface WikiInformationCardProps {
  disease: Disease;
}

export const WikiInformationCard: FC<WikiInformationCardProps> = ({
  disease,
}) => {
  const { data: recommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery(
      {
        'target-disease': disease.code.coding,
      },
      {
        selectFromResult: (result) => ({
          ...result,
          data: result.data?.map(ImmunizationRecommendationMapper.fromResource),
        }),
      }
    );
  if (recommendations === undefined) {
    return <></>;
  }

  const aggregateImmunizationStatus =
    calcAggregateImmunizationStatus(recommendations);

  return (
    <div>
      <Link to={`/dashboard/wiki/${disease.code.coding}`}>
        <Flex justifyContent={'space-between'} alignItems={'center'} pt={4}>
          <Text fontSize={'xl'} color={aggregateImmunizationStatus.iconColor}>
            {disease.name}
          </Text>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            {recommendations.length > 0 && (
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
  const { data: targetDiseases } = targetDiseaseApi.endpoints.get.useQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map(DiseaseMapper.fromResource),
      }),
    }
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
        {targetDiseases?.map((targetDisease) => (
          <WikiInformationCard disease={targetDisease} />
        ))}
      </Box>
    </Box>
  );
}
