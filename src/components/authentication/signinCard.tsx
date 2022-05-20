import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignInCard() {
  return (
    <Flex
      w={'full'}
      minW={'50vw'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={2} w={'100%'} maxW={'lg'} py={12} px={2}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to your personal{' '}
            <Text as={'span'} color={'brand.700'}>
              vaccination-pass
            </Text>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to='/forgotpassword' color={'blue.400'}>
                  Forgot password?
                </Link>
              </Stack>
              <Stack spacing={4}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Need to create an account?{' '}
                    <Link to={'/signup'}>
                      <Text color={'blue.400'}>Sign up</Text>
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
