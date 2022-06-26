import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VaccinationPass from '../../../assets/VaccinationPassV2.png';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import { FaBookMedical, FaRegCalendarAlt, FaSyringe } from 'react-icons/fa';

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
  { name: 'History', icon: FaSyringe, link: 'history' },
  { name: 'Recommendations', icon: FaRegCalendarAlt, link: 'recommendations' },
  { name: 'Wiki', icon: FaBookMedical, link: 'wiki' },
];

export const DashboardHeader: FC<DashboardProps> = ({
  onClose,
  onOpen,
  isOpen,
}) => {
  const { keycloak } = useKeycloak();
  const [profile, setProfile] = useState<KeycloakProfile | undefined>();
  useEffect(() => {
    keycloak.loadUserProfile().then((p) => setProfile(p));
  }, [keycloak, keycloak.authenticated]);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Box display={'block'} ref={menuRef} zIndex={'1000'}>
      <Flex
        w={'95vw'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.25)'
        borderRadius={'12px'}
        m={'10px'}
        position='fixed'
        zIndex={'99'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={'5px'}
        h={'55px'}
      >
        <Menu gutter={14}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            w={6}
            h={6}
            m={'5px'}
          />
          <MenuList zIndex={'dropdown'}>
            {LinkItems.map((navLink) => (
              <MenuItem
                onClick={() => {
                  navigate('/dashboard/' + navLink.link);
                }}
                icon={<Icon as={navLink.icon} />}
              >
                {navLink.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Link to={'/dashboard'}>
          <Image src={VaccinationPass} w={'200px'} align={'center'} />
        </Link>
        <Avatar m={'5px'} w={'35px'} h={'35px'} src='avatar-1.jpg' />
      </Flex>
    </Box>
  );
};
