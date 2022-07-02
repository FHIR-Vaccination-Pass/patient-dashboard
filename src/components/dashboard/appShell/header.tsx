import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  Image,
  Portal,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import VaccinationPass from '../../../assets/VaccinationPassV2.png';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import { FaBookMedical, FaHome, FaSignOutAlt, FaSyringe } from 'react-icons/fa';
import { NavItem } from './navitem';

interface DashboardProps extends BoxProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FaHome, link: '' },
  { name: 'Vaccination History', icon: FaSyringe, link: 'history' },
  { name: 'Vaccination Wiki', icon: FaBookMedical, link: 'wiki' },
];

export const DashboardHeader: FC<DashboardProps> = () => {
  const { keycloak } = useKeycloak();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState<KeycloakProfile | undefined>();
  useEffect(() => {
    keycloak.loadUserProfile().then((p) => setProfile(p));
  }, [keycloak, keycloak.authenticated]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [hideMenu, setHideMenu] = useBoolean();
  const [LogoutLoading, setLogoutLoading] = useBoolean(false);
  const logout = useCallback(() => {
    setLogoutLoading.on();
    keycloak.logout();
  }, [keycloak]);

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        m={'10px'}
        position='fixed'
        h={'55px'}
        w={'95vw'}
        ref={menuRef}
        zIndex={1000}
      >
        <Flex
          borderRadius={'12px'}
          boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.25)'
          justifyContent={'space-between'}
          alignItems={'center'}
          p={'5px'}
        >
          <HamburgerIcon w={6} h={6} m={'4px'} onClick={setHideMenu.toggle} />
          <Link to={'/dashboard'}>
            <Image src={VaccinationPass} w={'200px'} align={'center'} />
          </Link>
          <Avatar m={'5px'} w={'35px'} h={'35px'} src='avatar-1.jpg' />
        </Flex>
      </Box>

      <Portal containerRef={menuRef}>
        <Box
          visibility={hideMenu ? 'visible' : 'hidden'}
          opacity={hideMenu ? '1' : '0'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow='0 4px 12px 0 rgba(0, 20, 0, 0.25)'
          borderRadius={'0 0 12px 12px'}
          position='fixed'
          zIndex={'-5'}
          w={'90vw'}
          p={'5px'}
          m={'2.5vw'}
          mt={'0px'}
          transition={'visibility 0s, opacity 0.25s ease-in-out'}
        >
          {LinkItems.map((navLink) => (
            <NavItem
              title={navLink.name}
              icon={navLink.icon}
              navSize={'large'}
              active={false}
              link={navLink.link}
              onClose={setHideMenu.toggle}
            >
              {navLink.name}
            </NavItem>
          ))}
          <Button
            isLoading={LogoutLoading}
            leftIcon={<FaSignOutAlt />}
            colorScheme='red'
            variant='ghost'
            size={'lg'}
            onClick={logout}
            pl={'15px'}
            isActive={false}
            loadingText={'Logging out'}
            spinnerPlacement={'start'}
            fontWeight={'normal'}
          >
            Logout
          </Button>
        </Box>
      </Portal>
    </>
  );
};
