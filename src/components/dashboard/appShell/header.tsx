import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MobileMenu } from './mobileMenu';
import VaccinationPass from '../../../assets/VaccinationPass.png';
import VaccinationPassIcon from '../../../assets/VaccinationPassIcon.png';
import { Link } from 'react-router-dom';

interface DashboardProps extends BoxProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const DashboardHeader = ({
  onClose,
  onOpen,
  isOpen,
  ...rest
}: DashboardProps) => {
  return (
    <Flex
      flexDir='row'
      justifyContent={{ base: 'space-between', md: 'stretch' }}
      h={'100%'}
      pos='sticky'
      w={'100%'}
      {...rest}
    >
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'200px'}
        mt={'10px'}
        ml={'10px'}
        display={{ base: 'flex', md: 'none' }}
      >
        <Flex p='5%' flexDir='column' w='100%' alignItems={'flex-start'}>
          <Flex align='center' onClick={onOpen}>
            <Avatar size='md' src='avatar-1.jpg' />
            <Flex flexDir='column' ml={4} display={'flex'}>
              <Heading as='h3' size='sm'>
                Sylwia Weller
              </Heading>
              <Text color='gray'>Admin</Text>
            </Flex>
          </Flex>
        </Flex>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'full'}
          isCentered={true}
        >
          <MobileMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            {' '}
          </MobileMenu>
        </Modal>
      </Box>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'80%'}
        mt={'10px'}
        mr={'10px'}
        p={'10px'}
        flexBasis={'stretch'}
        alignItems={'center'}
        display={{ base: 'none', md: 'flex' }}
      >
        <Input
          ml={'20px'}
          mr={'20px'}
          variant='unstyled'
          focusBorderColor='base.700'
          placeholder='Search'
        />
      </Flex>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'250px'}
        mt={'10px'}
        mr={'10px'}
        p={'10px'}
        alignItems={'center'}
        _hover={{ boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.30)' }}
      >
        <Link to={'/dashboard'}>
          <Image
            src={VaccinationPass}
            w={'200px'}
            h={'40px'}
            align={'center'}
            display={{ base: 'none', md: 'block' }}
          />
          <Image
            src={VaccinationPassIcon}
            w={'40px'}
            h={'40px'}
            align={'center'}
            display={{ base: 'block', md: 'none' }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
