<<<<<<< HEAD:src/views/Authentication/SignIn.tsx
=======
import { Container, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { SyringeIllustration } from './/SyringeIllustration';
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/SignIn.tsx
import SignInCard from '../../components/authentication/signinCard';
import React, { FC } from 'react';
import AuthenticationWrapper from './AuthenticationWrapper';

const SignIn: FC = () => (
  <AuthenticationWrapper>
    <SignInCard />
  </AuthenticationWrapper>
);

<<<<<<< HEAD:src/views/Authentication/SignIn.tsx
export default SignIn;
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
        <SignInCard />
      ) : (
        <Stack isInline spacing={12} align='center' justify={'center'}>
          <SignInCard />
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
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/SignIn.tsx
