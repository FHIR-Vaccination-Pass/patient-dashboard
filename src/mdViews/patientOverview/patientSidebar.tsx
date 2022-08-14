import {
  Avatar,
  Box,
  BoxProps,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import React, { useState } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaBookMedical,
  FaPlane,
  FaSyringe,
  FaUserInjured,
} from 'react-icons/fa';
import { NavItem } from '../../components/dashboard/appShell/navitem';
import { Link, useLocation } from 'react-router-dom';
import { Patient } from '../../core/models/Patient';
import { resolvePatientName } from '../../core/services/util/resolveHumanName';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Patient Status', icon: FaUserInjured, link: '' },
  {
    name: 'Vaccination History',
    icon: FaSyringe,
    link: 'history',
  },
  { name: 'Disease Record', icon: FaBookMedical, link: 'record' },
  { name: 'Vacation Plans', icon: FaPlane, link: 'vacations' },
];

export const PatientSidebar = ({ onClose, ...rest }: SidebarProps) => {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const mapper = useMapper();
  let patientId: string;

  //TODO: This is way to hacky, please find a better solution to resolve the patient...
  if (pathComponents.length === 6) {
    patientId = pathComponents[pathComponents.length - 2];
  } else {
    patientId = pathComponents[pathComponents.length - 1];
  }
  const patient: Patient | undefined = mapper.getPatientById(patientId);
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={navSize === 'small' ? '10px' : '15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'100%'}
      pos='fixed'
      left='5'
      w={navSize === 'small' ? '75px' : '200px'}
      {...rest}
    >
      <Flex
        mt={2}
        flexDir='column'
        w='100%'
        h={'100%'}
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      >
        <Link to={`/md/dashboard/patient/${patient?.id}`}>
          <Flex m={1} align='center' p={navSize === 'small' ? '2px' : '5px'}>
            <Avatar></Avatar>
            <Text ml={2} display={navSize === 'small' ? 'none' : 'block'}>
              {resolvePatientName(patient?.name)}
            </Text>
          </Flex>
        </Link>

        <Divider />
        {LinkItems.map((navLink) => (
          <NavItem
            title={navLink.name}
            icon={navLink.icon}
            navSize={navSize}
            active={false}
            link={`/md/dashboard/patient/${patient?.id}/${navLink.link}`}
            onClose={onClose}
          >
            {navLink.name}
          </NavItem>
        ))}
      </Flex>

      <Box>
        <Flex
          mt={2}
          flexDir='column'
          w='100%'
          alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        >
          <Divider />
          <Flex align='center' w={navSize === 'small' ? 'unset' : '100%'}>
            <Menu placement='right'>
              <Flex
                p={3}
                pt={1}
                pb={1}
                mt={2}
                mb={2}
                w={'100%'}
                h={'100%'}
                _hover={{
                  textDecor: 'none',
                  backgroundColor: 'brand.10',
                }}
                color={'gray.500'}
                onClick={() => {
                  if (navSize === 'small') changeNavSize('large');
                  else changeNavSize('small');
                }}
              >
                <MenuButton>
                  <Flex>
                    <Icon
                      as={navSize === 'small' ? FaAngleRight : FaAngleLeft}
                      justifySelf={'center'}
                      alignSelf={'center'}
                      fontSize='xl'
                    />
                    <Text
                      align={'left'}
                      ml={2}
                      display={navSize === 'small' ? 'none' : 'flex'}
                    >
                      Collapse
                    </Text>
                  </Flex>
                </MenuButton>
              </Flex>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
