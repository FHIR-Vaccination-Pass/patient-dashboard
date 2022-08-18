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
import { getColorByStatus, getIconByStatus } from '../../../theme/theme';
import { ImmunizationRecommendation } from '../../../core/models';
import { useTargetDiseases } from '../../../hooks';

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
    [getColorByStatus(recommendation.status, 'gray') + '.300']
    // a single fallback or fallback array matching the length of the previous arg
  );
  const { data: targetDiseasesData, idToTargetDisease } = useTargetDiseases({});

  const disease = idToTargetDisease(
    targetDiseasesData?.byCode[diseaseId]?.ids[0]
  );
  return (
    <Link to={`/patient/dashboard/wiki/${disease?.code.coding.code}`}>
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
                colorScheme={getColorByStatus(recommendation.status, 'gray')}
                ml={5}
              >
                {recommendation.date.toDateString()}
              </Badge>
            </Text>
          </Box>
          {getIconByStatus(recommendation.status) !== undefined && (
            <Icon
              mt={'auto'}
              mb={'auto'}
              ml='3'
              as={getIconByStatus(recommendation.status)}
              color={getColorByStatus(recommendation.status, 'gray') + '.400'}
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
