import {
  Badge,
  Box,
  BoxProps,
  Flex,
  Icon,
  Text,
  useToken,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import {
  getColorByStatus,
  getIconByStatus,
  VaccinationStatus,
} from '../../../theme/theme';
import { ImmunizationRecommendation } from '../../../core/models/ImmunizationRecommendation';
import { Disease } from '../../../core/models/Disease';
import { useMapper } from '../../../core/services/resourceMapper/ResourceMapperContext';
import { ResourceMapper } from '../../../core/services/resourceMapper/ResourceMapper';

interface RecommendationCardProps extends BoxProps {
  recommendation: ImmunizationRecommendation;
  diseaseId: string;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({
  recommendation,
  diseaseId,
}) => {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    [
      getColorByStatus(
        recommendation.forecastStatus.text as VaccinationStatus,
        'gray'
      ) + '.300',
    ]
    // a single fallback or fallback array matching the length of the previous arg
  );
  const mapper: ResourceMapper = useMapper();
  const disease: Disease | undefined = mapper.getDiseaseById(diseaseId);
  return (
    <Link to={`/dashboard/wiki/${disease?.code.text}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        borderRadius={'15px'}
        boxShadow={`0 0 2px 0.5px ${color}`}
      >
        <Flex justifyContent={'space-between'} w={'90%'}>
          <Box p='3'>
            <Text fontWeight='bold'>{disease?.name}</Text>
            <Text textColor={'gray'}>
              Due:
              <Badge
                fontSize={'sm'}
                colorScheme={getColorByStatus(
                  recommendation.forecastStatus.text as VaccinationStatus,
                  'gray'
                )}
                ml={5}
              >
                {recommendation.date.toDateString()}
              </Badge>
            </Text>
          </Box>
          {getIconByStatus(
            recommendation.forecastStatus.text as VaccinationStatus
          ) !== undefined && (
            <Icon
              mt={'auto'}
              mb={'auto'}
              ml='3'
              as={getIconByStatus(
                recommendation.forecastStatus.text as VaccinationStatus
              )}
              color={
                getColorByStatus(
                  recommendation.forecastStatus.text as VaccinationStatus,
                  'gray'
                ) + '.400'
              }
              w={6}
              h={6}
            />
          )}
        </Flex>
        <ChevronRightIcon w={8} h={8} m={4} />
      </Flex>
    </Link>
  );
};
