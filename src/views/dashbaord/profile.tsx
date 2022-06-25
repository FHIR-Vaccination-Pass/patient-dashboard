import { Box, Button, Text } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

export function Profile() {
  return (
    <Box bg={'gray.100'} h={'100%'} position={'relative'}>
      <Text> Hey Profile! </Text>
      <Button
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        leftIcon={<FaSignOutAlt />}
        colorScheme='teal'
        variant='solid'
        size={'md'}
      >
        Logout
      </Button>
    </Box>
  );
}
