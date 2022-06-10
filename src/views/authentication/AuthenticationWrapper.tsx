import {
  Container,
  Flex,
  Image,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { FC } from 'react';

const AuthenticationWrapper: FC = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container
      overflowY={'hidden'}
      maxW={'10xl'}
      h={'100vh'}
      bg={'background.900'}
      centerContent
    >
      {isMobile ? (
        children
      ) : (
        <Stack isInline spacing={12} align='center' justify={'center'}>
          {children}
          <Flex w={'full'}>
            <Image
              src={'assets/auth/syringe.svg'}
              height={{ sm: '22rem', lg: '26rem' }}
              maxW={'40vw'}
            />
          </Flex>
        </Stack>
      )}
    </Container>
  );
};

export default AuthenticationWrapper;
