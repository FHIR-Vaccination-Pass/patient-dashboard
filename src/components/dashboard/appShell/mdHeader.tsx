import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VaccinationPass from '../../../assets/VaccinationPassV2.png';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';
import {
  FaBookMedical,
  FaSignOutAlt,
  FaSyringe,
  FaUserCircle,
} from 'react-icons/fa';
import { usePatients } from '../../../hooks';
import Select from 'react-select';

export const DashboardHeader: FC = () => {
  const { keycloak } = useKeycloak();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState<KeycloakProfile | undefined>();
  useEffect(() => {
    keycloak.loadUserProfile().then((p) => setProfile(p));
  }, [keycloak, keycloak.authenticated]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logoutLoading, setLogoutLoading] = useBoolean(false);
  const logout = useCallback(() => {
    setLogoutLoading.on();
    keycloak.logout();
  }, [keycloak, setLogoutLoading]);

  const params = useParams();
  const navigate = useNavigate();
  const { patients } = usePatients({});
  const patientOptions = useMemo(
    () =>
      patients?.map((p) => ({
        value: p.id,
        label: `${p.name.given[0]} ${p.name.family}`,
      })),
    [patients]
  );
  const selectedOption = patientOptions?.find(
    ({ value }) => value === params['patientId']
  ) ?? {
    value: '',
    label: 'Patient Search',
  };

  return (
    <>
      <Box
        m={'10px'}
        position='fixed'
        h={'55px'}
        w={'98%'}
        ref={menuRef}
        zIndex={1000}
      >
        <Flex
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.25)'
          borderRadius={'12px'}
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

          <Flex flexDirection={'row'} w={'50%'}>
            <FormControl mr={'5px'}>
              <Select
                placeholder={'Patient Search'}
                options={patientOptions}
                value={selectedOption}
                onChange={(newValue) => {
                  navigate(`/md/dashboard/patient/${newValue!.value}`);
                }}
              />
            </FormControl>
          </Flex>
          <HStack spacing={5} mr={'15px'}>
            <Link to={'vaccines'}>
              <Icon
                as={FaSyringe}
                justifySelf={'center'}
                alignSelf={'center'}
                fontSize='x-large'
                color={'gray.500'}
                mt={'5px'}
              />
            </Link>
            <Link to={'diseases'}>
              <Icon
                as={FaBookMedical}
                justifySelf={'center'}
                alignSelf={'center'}
                fontSize='x-large'
                color={'gray.500'}
                mt={'5px'}
              />
            </Link>
            <Menu>
              <Tooltip label={`${profile?.firstName} ${profile?.lastName}`}>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<Avatar w={'35px'} h={'35px'} src='avatar-1.jpg' />}
                  bg={'white'}
                />
              </Tooltip>
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
    </>
  );
};
