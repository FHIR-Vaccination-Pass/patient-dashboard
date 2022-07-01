import {
  HStack,
  VStack,
  Heading,
  useColorModeValue,
  Flex,
  IconButton,
  TableContainer,
  Td,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Image,
  Box,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import React from 'react';
import WorldMap from '../../assets/worldMaps/WorldMap.svg';

export function VaccineDetailPage() {
  const vaccination = {
    name: 'Coronavirus',
    immunizationAgainst: 'Covid-19',
    code: 'Z98',
    description:
      'There are several COVID-19 vaccines validated for use by WHO (given Emergency Use Listing).\n' +
      '                        The first mass vaccination programme started in early December 2020 and the number of\n' +
      '                        vaccination doses administered is updated on a daily basis on the COVID-19 dashboard.\n' +
      '                        The WHO Emergency Use Listing process determines whether a product can be recommended\n' +
      '                        for use based on all the available data on safety and efficacy and on its suitability in low-\n' +
      '                        and middle-income countries.\n' +
      '                        Vaccines are assessed to ensure they meet acceptable standards of quality, safety and efficacy\n' +
      '                        using clinical trial data,\n' +
      '                        manufacturing and quality control processes.\n' +
      '                        The assessment weighs the threat posed by the emergency as well as the benefit that would accrue\n' +
      '                        from the use of the product against any potential risks.\n' +
      '                        In line with their national regulations and legislation, countries have the autonomy to issue\n' +
      '                        emergency use authorizations for any health product.\n' +
      '                        Domestic emergency use authorizations are issued at the discretion of countries and not subject\n' +
      '                        to WHO approval.',
    risks: ['Headache', 'fever', 'pain around the puncture site', 'Dizziness'],
    vaccines: [
      {
        name: 'Corminaty',
        manufacturer: 'BionTech',
        numberOfDoses: 3,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
      {
        name: 'AstraZeneca',
        manufacturer: 'AstraZeneca',
        numberOfDoses: 3,
        recommendedAgeStart: 40,
        recommendedAgeEnd: 99,
      },
      {
        name: 'Jhonnson & Jhonsson',
        manufacturer: 'Jhonnson & Jhonsson',
        numberOfDoses: 1,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
      {
        name: 'Moderna',
        manufacturer: 'Moderna',
        numberOfDoses: 3,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
    ],
    relevantLocations: ['Global'],
  };
  return (
    <Box>
      <div>
        <Image
          src={WorldMap}
          style={{ aspectRatio: '2000 / 857' }}
          align={'center'}
          mb={'10px'}
        />
      </div>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'30px'}
        w={'100%'}
        style={{ marginBottom: '20px' }}
        position={'relative'}
        zIndex={'-1'}
      >
        <VStack
          style={{
            alignSelf: 'self-start',
            width: '100%',
          }}
        >
          <IconButton
            colorScheme='aviGreen'
            aria-label='information'
            size='lg'
            icon={<InfoIcon />}
            style={{ cursor: 'default', width: '100%' }}
            borderRadius={'20px 20px 0 0'}
          />
          <Box marginLeft={'10px !important'}>
            <Heading style={{ alignSelf: 'flex-start' }} fontSize={'lg'}>
              {vaccination.name}
            </Heading>
            <HStack>
              <div className={'vaccination-description'}>
                <span>
                  <span className={'accordion-content-header'}>Disease:</span>{' '}
                  {vaccination.name}
                  <br />
                </span>
                <span>
                  <span className={'accordion-content-header'}>
                    Immunization against:
                  </span>{' '}
                  {vaccination.immunizationAgainst}
                  <br />
                </span>
                <span>
                  <span className={'accordion-content-header'}>
                    Relevant Locations:
                  </span>{' '}
                  {vaccination.relevantLocations}
                  <br />
                </span>
                <span>
                  <span className={'accordion-content-header'}>
                    Description:
                  </span>{' '}
                  {vaccination.description}
                  <br />
                </span>
                <span className={'accordion-content-header'}>
                  Possible vaccines:
                </span>
                <br />
              </div>
            </HStack>
          </Box>
          <div
            style={{
              position: 'relative',
              width: '90%',
              alignSelf: 'self-start',
            }}
          >
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Vaccine</Th>
                    <Th>Manufacturer</Th>
                    <Th isNumeric>Number of doses</Th>
                    <Th isNumeric>Recommended age</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {vaccination.vaccines.map((vaccine) => (
                    <Tr>
                      <Td>{vaccine.name}</Td>
                      <Td>{vaccine.manufacturer}</Td>
                      <Td isNumeric>{vaccine.numberOfDoses}</Td>
                      <Td isNumeric>
                        {vaccine.recommendedAgeStart} -{' '}
                        {vaccine.recommendedAgeEnd}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </VStack>
      </Flex>
    </Box>
  );
}
