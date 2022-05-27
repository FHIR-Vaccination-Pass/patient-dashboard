<<<<<<< HEAD:src/views/Authentication/SignUp.tsx
import React, { FC } from 'react';
=======
import { Container, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { SyringeIllustration } from './SyringeIllustration';
import React from 'react';
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/SignUp.tsx
import SignUpCard from '../../components/authentication/signupCard';
import AuthenticationWrapper from './AuthenticationWrapper';

const SignUp: FC = () => (
  <AuthenticationWrapper>
    <SignUpCard />
  </AuthenticationWrapper>
);

<<<<<<< HEAD:src/views/Authentication/SignUp.tsx
export default SignUp;
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
        <SignUpCard />
      ) : (
        <Stack isInline spacing={12} align='center' justify={'center'}>
          <SignUpCard />
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
>>>>>>> 8fb96bb (Fix typo and optimise imports):src/views/authentication/SignUp.tsx
