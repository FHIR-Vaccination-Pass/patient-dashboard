import { Container, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { SyringeIllustration } from './SyringeIllustration';
import React from 'react';
import SignUpCard from '../../components/authentication/signupCard';

export default function SignUp() {
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
