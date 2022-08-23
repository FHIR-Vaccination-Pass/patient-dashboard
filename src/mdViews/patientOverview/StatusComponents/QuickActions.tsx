import React, { FC } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { AddImmunizationModal } from '../addImmunizationModal';

export const QuickActions: FC = () => {
  const params = useParams();
  const patientId = params['patientId']!;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          onClick={onOpen}
        >
          Add Vaccination
        </Button>
      </Flex>
      <AddImmunizationModal
        isOpen={isOpen}
        onClose={onClose}
        patientId={patientId}
      />
    </>
  );
};
