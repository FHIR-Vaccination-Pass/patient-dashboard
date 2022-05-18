import { Container, Flex, Stack } from '@chakra-ui/react';
import { SyringeIllustartion } from '../Authentication/SyringeIllustartion';
import SignInCard from '../../components/authentication/signinCard';
import React from 'react';

export default function SignIn() {
  return (
    <Container
      overflowY={'hidden'}
      maxW={'10xl'}
      h={'100vh'}
      bg={'background.900'}
      centerContent
    >
      <Stack isInline spacing={2} align='center' justify={'center'}>
        <SignInCard />
        <Flex w={'full'}>
          <SyringeIllustartion
            height={{ sm: '22rem', lg: '26rem' }}
            maxW={'40vw'}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
