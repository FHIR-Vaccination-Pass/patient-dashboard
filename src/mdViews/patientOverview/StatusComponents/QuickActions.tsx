import { FC } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export const QuickActions: FC = ({}) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      flexDir='column'
      justifyContent='space-between'
      h={'100%'}
      w={'100%'}
    ></Flex>
  );
};
