import {
  Badge,
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HistoryItems } from './vaccineHistoryMockData';
import { FaVirus } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';

interface VaccineHistoryWidgetProps extends BoxProps {}

export const VaccineHistoryWidget = ({
  ...rest
}: VaccineHistoryWidgetProps) => {
  const mockData = HistoryItems;
  return (
    <Stack
      maxW={'100%'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.25)'
      rounded={'xl'}
      h={'100%'}
      justifyContent={'flex-start'}
      p={'15px'}
      overflow={'hidden'}
    >
      <Box p={'10px'}>
        <Heading size={'md'} fontWeight={'bold'}>
          Your personal vaccination history:{' '}
        </Heading>
      </Box>
      <Divider mb={'10px'} />
      <Stack overflowY={'scroll'} h={'100%'}>
        {mockData.slice(0, 5).map((item, index) => (
          <Stack
            borderRadius={'15px'}
            border={'1px solid'}
            borderColor={'gray.200'}
            _hover={{
              textDecor: 'none',
              backgroundColor: 'brand.10',
            }}
          >
            <Flex>
              <Icon
                mt={'auto'}
                mb={'auto'}
                ml='3'
                as={FaVirus}
                color={'brand.400'}
                fontSize={'30pt'}
              />
              <Box p='3'>
                <Text fontWeight='bold'>Vaccine Name</Text>
                <Text fontSize='md'>{item.name}</Text>
              </Box>
            </Flex>
            <Divider />
            <Flex mt={'0px !important'} wrap={'wrap'}>
              <Box p='3'>
                <Badge fontSize={'sm'} colorScheme='blue'>
                  {item.date}
                </Badge>
              </Box>
              <Box p='3'>
                <Badge fontSize={'sm'} colorScheme='purple'>
                  {item.medicalDoctor}
                </Badge>
              </Box>
              <Box p='3'>
                <Badge fontSize={'sm'} colorScheme='purple'>
                  {item.desc}
                </Badge>
              </Box>
            </Flex>
          </Stack>
        ))}
        <Link to={'history'}>
          <Button w={'full'} colorScheme='brand.700' variant='ghost'>
            See full vaccination history
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};
