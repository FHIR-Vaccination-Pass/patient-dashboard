import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { FaViruses } from 'react-icons/fa';
import React from 'react';

export function Overview() {
  return (
    <Grid
      minH='100%'
      maxH={'90vh'}
      templateRows={'repeat(12, 1fr)'}
      templateColumns='repeat(12, 1fr)'
      gap={5}
    >
      {/* Mobile */}
      <GridItem colSpan={12} rowSpan={2}>
        <Flex
          bg={'gray.100'}
          borderRadius={'6px'}
          w={'100%'}
          h={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <InfoIcon color={'gray.500'} w={10} h={10} m={15} />
          <Stack>
            <Text fontWeight='bold' color={'gray.700'}>
              No immunization record
            </Text>
            <Text color={'gray.700'}>
              Your account is not asscociated with immunization data.
            </Text>
          </Stack>
        </Flex>
      </GridItem>
      <GridItem colSpan={12} rowSpan={10}>
        <Text color={'gray.500'} mb={5}>
          Upcoming vaccinations
        </Text>

        <Flex
          justifyContent={'space-between'}
          borderRadius={'15px'}
          border={'1px solid'}
          borderColor={'gray.200'}
          alignItems={'center'}
        >
          <Flex>
            <Icon
              mt={'auto'}
              mb={'auto'}
              ml='3'
              as={FaViruses}
              color={'brand.400'}
              fontSize={'30pt'}
            />
            <Box p='3'>
              <Text fontWeight='bold'>Vaccine Name</Text>
              <Badge fontSize={'sm'} colorScheme='blue'>
                item.date
              </Badge>
            </Box>
          </Flex>
          <ChevronRightIcon w={8} h={8} m={4} />
        </Flex>
      </GridItem>
    </Grid>
  );
}
