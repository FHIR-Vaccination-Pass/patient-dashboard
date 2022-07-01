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
import { ImmunizationRecommendationRecommendation } from 'fhir/r4';

interface RecommendationCardProps extends BoxProps {
  configuration: ImmunizationRecommendationRecommendation;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({
  configuration,
}) => {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    [getColorByStatus(configuration.forecastStatus.text) + '.300']
    // a single fallback or fallback array matching the length of the previous arg
  );
  return (
    <Link to={`/dashboard/wiki/${configuration.targetDisease?.text}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        borderRadius={'15px'}
        border={'1px solid'}
        borderColor={color}
        boxShadow={`0 0 2px 0.5px ${color}`}
      >
        <Flex justifyContent={'space-between'} w={'90%'}>
          <Box p='3'>
            <Text fontWeight='bold'>{configuration.targetDisease?.text}</Text>
            <Text>
              Due:
              <Badge
                fontSize={'sm'}
                colorScheme={getColorByStatus(
                  configuration.forecastStatus.text
                )}
                ml={5}
              >
                {configuration.dateCriterion !== undefined &&
                  configuration.dateCriterion[0].value}
              </Badge>
            </Text>
          </Box>
          {getIconByStatus(configuration.forecastStatus.text) !== undefined && (
            <Icon
              mt={'auto'}
              mb={'auto'}
              ml='3'
              as={getIconByStatus(configuration.forecastStatus.text)}
              color={
                getColorByStatus(configuration.forecastStatus.text) + '.400'
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
