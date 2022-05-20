import { Container, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { SyringeIllustartion } from '../Authentication/SyringeIllustartion';
import SignInCard from '../../components/authentication/signinCard';
import React from 'react';

export default function SignIn() {
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
        <SignInCard />
      ) : (
        <Stack isInline spacing={12} align='center' justify={'center'}>
          <SignInCard />
          <Flex w={'full'}>
            <SyringeIllustartion
              height={{ sm: '22rem', lg: '26rem' }}
              maxW={'40vw'}
            />
          </Flex>
        </Stack>
      )}
    </Container>
  );
}
