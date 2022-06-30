import { Badge, Box, BoxProps, Flex, Icon, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaViruses } from 'react-icons/fa';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface RecommendationCardProps extends BoxProps {
  recommendation: MockRecommendationProps;
}

interface MockRecommendationProps {
  diseaseName: string;
  due: string;
  code: string;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  return (
    <Link to={`/dashboard/wiki/${recommendation.code}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        borderRadius={'15px'}
        border={'1px solid'}
        borderColor={'gray.200'}
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
            <Text fontWeight='bold'>{recommendation.diseaseName}</Text>
            <Text>
              Due:
              <Badge fontSize={'sm'} colorScheme='gray' ml={5}>
                {recommendation.due}
              </Badge>
            </Text>
          </Box>
        </Flex>
        <ChevronRightIcon w={8} h={8} m={4} />
      </Flex>
    </Link>
  );
};
