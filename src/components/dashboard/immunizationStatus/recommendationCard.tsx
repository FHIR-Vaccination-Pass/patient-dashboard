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
import { FaViruses } from 'react-icons/fa';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { ImmunizationRecommendation } from '../../../core/models/immunizationRecommendation';

interface RecommendationCardProps extends BoxProps {
  status: ImmunizationRecommendation;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({ status }) => {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    [status.backgroundColor]
    // a single fallback or fallback array matching the length of the previous arg
  );
  return (
    <Link to={`/dashboard/wiki/${status.code}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        borderRadius={'15px'}
        border={'1px solid'}
        borderColor={status.backgroundColor}
        boxShadow={`0 0 5px 0.5px ${color}`}
      >
        <Flex>
          <Icon
            mt={'auto'}
            mb={'auto'}
            ml='3'
            as={FaViruses}
            color={'brand.400'}
            fontSize={'30pt'}
          />
          <Box p='3'>
            <Text fontWeight='bold'>{status.diseaseName}</Text>
            <Text>
              Due:
              <Badge
                fontSize={'sm'}
                colorScheme={status.backgroundColor}
                ml={5}
              >
                {status.due.toDateString()}
              </Badge>
            </Text>
          </Box>
        </Flex>
        <ChevronRightIcon w={8} h={8} m={4} />
      </Flex>
    </Link>
  );
};
