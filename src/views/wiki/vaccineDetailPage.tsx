import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
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
      '                        using clinical trial data.',
    risks: ['Headache', 'fever', 'pain around the puncture site', 'Dizziness'],
    ageStart: 0,
    ageEnd: 99,
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
    <Box pb={5}>
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
        borderRadius={'15px'}
        w={'100%'}
        position={'relative'}
        zIndex={'0'}
      >
        <VStack
          style={{
            alignSelf: 'self-start',
            width: '100%',
          }}
        >
          <Box
            backgroundColor={'gray.200'}
            h={'60px'}
            alignItems={'center'}
            style={{ cursor: 'default', width: '100%' }}
            borderRadius={'15px 15px 0 0'}
            display={'flex'}
          >
            <Text ml={'20px'} fontSize={'xl'}>
              {vaccination.name}
            </Text>
          </Box>
          <VStack
            marginLeft={'20px !important'}
            marginRight={'20px !important'}
            display={'block'}
          >
            <Box mb={'20px'}>
              <Heading
                as='h4'
                size='md'
                fontWeight={'normal'}
                mt={'10px'}
                mb={'10px'}
              >
                Disease Description
              </Heading>
              <Text color={'gray.500'}>{vaccination.description}</Text>
            </Box>
            <Box mb={'20px'}>
              <Heading
                as='h4'
                size='md'
                fontWeight={'normal'}
                mt={'10px'}
                mb={'10px'}
              >
                Recommendations
              </Heading>
              <Text color={'gray.500'}>
                The STIKO recommends start immunization for {vaccination.name}{' '}
                earlies from age {vaccination.ageStart} and latest until age{' '}
                {vaccination.ageEnd}.
              </Text>
            </Box>
            <Box mb={'20px'}>
              <Heading
                as='h4'
                size='md'
                fontWeight={'normal'}
                mt={'10px'}
                mb={'10px'}
              >
                Affected Locations
              </Heading>
              <UnorderedList color={'gray.500'}>
                {vaccination.relevantLocations.map((location) => (
                  <ListItem ml={'10px'}>{location}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box mb={'20px'}>
              <Heading
                as='h4'
                size='md'
                fontWeight={'normal'}
                mt={'10px'}
                mb={'15px'}
              >
                Vaccines
              </Heading>
              <Accordion defaultIndex={[]} allowMultiple mb={'20px'}>
                {vaccination.vaccines.map((vaccine) => (
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {vaccine.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} mr={'-15px'}>
                      <HStack position={'relative'}>
                        <Text>Manufacturer:</Text>
                        <Badge
                          colorScheme={'blue'}
                          textAlign={'center'}
                          position={'absolute'}
                          right={'0px'}
                          minW={'100px'}
                        >
                          {vaccine.manufacturer}
                        </Badge>
                      </HStack>
                      <HStack position={'relative'}>
                        <Text>Number of Dosis:</Text>
                        <Box
                          width={'100px'}
                          backgroundColor={'gray.100'}
                          textAlign={'center'}
                          position={'absolute'}
                          right={'0px'}
                        >
                          <Text fontSize={'xs'}>{vaccine.numberOfDoses}</Text>
                        </Box>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
}
