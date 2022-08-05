import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import VaccinationPass from '../../../assets/VaccinationPassV2.png';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';
import { IconType } from 'react-icons';
import {
  FaBookMedical,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaSyringe,
  FaUser,
  FaUserCircle,
} from 'react-icons/fa';
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
  const [logoutLoading, setLogoutLoading] = useBoolean(false);
  const logout = useCallback(() => {
    setLogoutLoading.on();
    keycloak.logout();
  }, [keycloak, setLogoutLoading]);

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        m={'10px'}
        position='fixed'
        h={'55px'}
        w={'98%'}
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
          <Link to={'/md/dashboard'}>
            <Image
              src={VaccinationPass}
              w={'200px'}
              align={'center'}
              m={'15px'}
            />
          </Link>

          <InputGroup w={'50%'}>
            <InputLeftElement
              pointerEvents='none'
              children={<FaUser color={'gray'} />}
            />
            <Input
              variant='filled'
              type='user'
              placeholder='Patient Search'
              focusBorderColor={'gray.400'}
            />
          </InputGroup>
          <HStack spacing={5} mr={'15px'}>
            <Link to={'settings'}>
              <Icon
                as={FaCog}
                justifySelf={'center'}
                alignSelf={'center'}
                fontSize='x-large'
                color={'gray.500'}
                mt={'5px'}
              />
            </Link>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<Avatar w={'35px'} h={'35px'} src='avatar-1.jpg' />}
                bg={'white'}
              />
              <MenuList>
                <MenuItem p={'6px 12px'} icon={<FaUserCircle />}>
                  Profile
                </MenuItem>
                <MenuItem p={'0px'}>
                  <Button
                    isLoading={logoutLoading}
                    leftIcon={<FaSignOutAlt />}
                    colorScheme='red'
                    variant='ghost'
                    onClick={logout}
                    isActive={false}
                    loadingText={'Logging out'}
                    spinnerPlacement={'start'}
                    fontWeight={'normal'}
                    width={'100%'}
                    justifyContent={'flex-start'}
                    p={'6px 12px'}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
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
            isLoading={logoutLoading}
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
            width={'100%'}
            justifyContent={'flex-start'}
          >
            Logout
          </Button>
        </Box>
      </Portal>
    </>
  );
};
