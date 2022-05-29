import {
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm(): JSX.Element {
  return (
    <Flex
      w={'full'}
      minW={'50vw'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id='email'>
          <Input
            placeholder='your-email@example.com'
            _placeholder={{ color: 'gray.500' }}
            type='email'
          />
        </FormControl>
        <Stack spacing={6}>
          <HStack justify={'space-between'}>
            <Link to='/signin'>
              <Button variant={'outline'} color={'blue.400'}>
                Cancel
              </Button>
            </Link>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              width={'80%'}
            >
              Request Reset
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </Flex>
  );
}
