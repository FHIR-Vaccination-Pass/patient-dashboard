<<<<<<< HEAD:src/views/Authentication/ForgotPassword.tsx
import React, { FC } from 'react';
=======
import { Container, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { SyringeIllustration } from './SyringeIllustration';
import React from 'react';
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/ForgotPassword.tsx
import ForgotPasswordForm from '../../components/authentication/forgotPasswordCard';
import AuthenticationWrapper from './AuthenticationWrapper';

const ForgotPassword: FC = () => (
  <AuthenticationWrapper>
    <ForgotPasswordForm />
  </AuthenticationWrapper>
);

<<<<<<< HEAD:src/views/Authentication/ForgotPassword.tsx
export default ForgotPassword;
=======
  return (
    <Container
      overflowY={'hidden'}
      maxW={'10xl'}
      h={'100vh'}
      bg={'background.900'}
      centerContent
    >
      {isMobile ? (
        <ForgotPasswordForm />
      ) : (
        <Stack isInline spacing={12} align='center' justify={'center'}>
          <ForgotPasswordForm />
          <Flex w={'full'}>
            <SyringeIllustration
              height={{ sm: '22rem', lg: '26rem' }}
              maxW={'40vw'}
            />
          </Flex>
        </Stack>
      )}
    </Container>
  );
}
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/ForgotPassword.tsx
