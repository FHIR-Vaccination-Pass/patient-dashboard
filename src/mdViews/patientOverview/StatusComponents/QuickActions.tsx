import React, { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

export const QuickActions: FC = ({}) => {
  return (
    <Flex
      bg={'white'}
      flexDir='row-reverse'
      justifyContent='space-between'
      h={'100%'}
      w={'100%'}
    >
      <Button
        variant={'solid'}
        color={'white'}
        bg={'green.400'}
        _hover={{ bg: 'green.500' }}
        _active={{ bg: 'green.500' }}
        _focus={{
          bg: 'green.500',
        }}
        alignSelf={'center'}
        mr={'5px'}
      >
        Add Vaccination
      </Button>
    </Flex>
  );
};
