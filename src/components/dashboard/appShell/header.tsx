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
import React, { useEffect, useState } from 'react';
import { MobileMenu } from './mobileMenu';
import { Link } from 'react-router-dom';
import VaccinationPass from '../../../assets/VaccinationPass.png';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';

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
  const { keycloak } = useKeycloak();
  const [profile, setProfile] = useState<KeycloakProfile | undefined>();
  useEffect(() => {
    keycloak.loadUserProfile().then((p) => setProfile(p));
  }, [keycloak, keycloak.authenticated]);

  return (
    <Flex
      flexDir='row'
      justifyContent={{ base: 'space-between', md: 'stretch' }}
      h={'100%'}
      pos='sticky'
      w={'100%'}
      {...rest}
    >
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'100%'}
        mt={'10px'}
        mr={'10px'}
        p={'10px'}
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
        mt={'10px'}
        ml={'10px'}
        p={'10px'}
        alignItems={'center'}
        display={{ base: 'block', md: 'none' }}
        _hover={{ boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.30)' }}
      >
        <Link to={'/dashboard'}>
          <Image src={VaccinationPass} w={'200px'} align={'center'} />
        </Link>
      </Flex>

      {/* Mobile */}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'60px'}
        mt={'10px'}
        mr={'10px'}
        display={{ base: 'flex', md: 'none' }}
      >
        <Flex m='auto' flexDir='column' w='100%' alignItems={'center'}>
          <Flex align='center' onClick={onOpen}>
            <Avatar size='md' src='avatar-1.jpg' />
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

      {/* Desktop */}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'20px'}
        w={'350px'}
        mt={'10px'}
        mr={'10px'}
        display={{ base: 'none', md: 'flex' }}
      >
        <Flex p='5%' flexDir='column' w='100%' alignItems={'flex-start'}>
          <Link to={'profile'}>
            <Flex align='center'>
              <Avatar size='md' src='avatar-1.jpg' />
              <Flex flexDir='column' ml={4} display={'flex'}>
                <Heading as='h3' size='sm'>
                  {keycloak.subject}
                </Heading>
                <Text color='gray'>Admin</Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};
