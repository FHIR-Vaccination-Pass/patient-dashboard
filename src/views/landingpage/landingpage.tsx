import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { InjectionIllustartion } from './InjectionIllustartion';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landingpage() {
  return (
    <Container
      overflowY={'hidden'}
      maxW={'10xl'}
      h={'100vh'}
      bg={'background.900'}
    >
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Managing vaccinations{' '}
          <Text as={'span'} color={'brand.700'}>
            made easy
          </Text>
        </Heading>
        <Text color={'brand.700'} maxW={'4xl'}>
          Never miss a vaccination again. Our digital vaccination-pass makes it
          easy for you to track all your vaccinations, schedule appointments
          with your doctor and get all teh information you need on a vaccine.
          Our automated timeline generation for your personal vaccination
          appointments will help you to stay on track.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Link to={'signin'}>
            <Button
              rounded={'full'}
              px={10}
              colorScheme={'brand'}
              bg={'brand.400'}
              _hover={{ bg: 'brand.500' }}
            >
              Sign in
            </Button>
          </Link>
          <Link to={'signup'}>
            <Button rounded={'full'} px={10} color={'brand.800'}>
              Sign up
            </Button>
          </Link>
        </Stack>
        <Flex w={'full'}>
          <InjectionIllustartion
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
