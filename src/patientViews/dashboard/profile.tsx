import { Box, Button, Text } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { useGetMeQuery } from '../../core/services/redux/server/server';

export function Profile() {
  const { keycloak } = useKeycloak();
  const logout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  const { data } = useGetMeQuery();

  return (
    <Box bg={'gray.100'} h={'100%'} position={'relative'}>
      <Text>
        Hey Profile! vaccination-pass-server response is: {JSON.stringify(data)}
      </Text>
      <Button
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        leftIcon={<FaSignOutAlt />}
        colorScheme='teal'
        variant='solid'
        size={'md'}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}
