import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import WorldMap from '../../assets/worldMaps/WorldMap.svg';
import {
  getColorByStatus,
  getIconByStatus,
  VaccinationStatus,
} from '../../theme/theme';
import { mockVaccinations } from '../../core/mockData/mockVaccinations';
import { MockRecommendations } from '../../core/mockData/mockRecommendation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  const vaccinationHistory = mockVaccinations.filter((vacc) => {
    return vacc.diseaseName === 'Disease A';
  });
  const recommendation = MockRecommendations[0].recommendation.find((r) => {
    return r.targetDisease?.text === 'Disease A';
  });
  const color = getColorByStatus(
    recommendation?.forecastStatus.text as VaccinationStatus,
    'gray'
  );
  const dueText = `Immunization due in less than a month`;
  const [showHistory, setShowHistory] = useBoolean(true);
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
          <Flex
            backgroundColor={`${color}.100`}
            h={'60px'}
            alignItems={'center'}
            style={{ width: '100%' }}
            borderRadius={'15px 15px 0 0'}
            onClick={setShowHistory.toggle}
          >
            <Flex
              justifyContent={'space-between'}
              flexDirection={'column'}
              w={'100%'}
            >
              <Text ml={'20px'} fontSize={'xl'}>
                {vaccination.name}
              </Text>
              {recommendation !== undefined && (
                <Text ml={'20px'} color={'gray.600'} fontSize={'12px'}>
                  {dueText}
                </Text>
              )}
            </Flex>
            <Flex alignItems={'center'} mr={'20px'}>
              {recommendation !== undefined && (
                <Icon
                  mt={'auto'}
                  mb={'auto'}
                  mr='3'
                  as={getIconByStatus(
                    recommendation.forecastStatus.text as VaccinationStatus
                  )}
                  color={
                    getColorByStatus(
                      recommendation.forecastStatus.text as VaccinationStatus,
                      'gray'
                    ) + '.400'
                  }
                  w={6}
                  h={6}
                />
              )}
              {!showHistory && <FaChevronDown size={18} />}
              {showHistory && <FaChevronUp size={18} />}
            </Flex>
          </Flex>
          {showHistory && (
            <Flex
              bg={`${color}.100`}
              w={'100%'}
              mt={'0px !important'}
              pt={'5px'}
              flexDirection={'column'}
            >
              <Text color={'gray.600'} ml={'20px'} mb={'5px'}>
                Previous vaccinations
              </Text>
              {vaccinationHistory.map((v) => (
                <Stack
                  m={'0px 20px 5px 20px'}
                  bg={'gray.100'}
                  boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
                  borderRadius={'5px'}
                  overflow={'hidden'}
                >
                  <Grid
                    templateColumns='1fr 1fr 1fr'
                    rowGap={'5px'}
                    columnGap={'10px'}
                    p={'5px'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    templateRows={'1fr 1fr'}
                  >
                    <GridItem>
                      <Text w={'1fr'}>{v.vaccineName}</Text>
                    </GridItem>
                    <GridItem w={'1fr'}>
                      <Badge
                        colorScheme={'green'}
                        variant='subtle'
                        w={'100%'}
                        textAlign={'center'}
                      >
                        {v.date}
                      </Badge>
                    </GridItem>
                    <GridItem w={'1fr'}>
                      <Badge
                        colorScheme={'gray'}
                        variant='solid'
                        w={'100%'}
                        textAlign={'center'}
                      >
                        {v.dose}
                      </Badge>
                    </GridItem>

                    <GridItem>
                      <Badge
                        colorScheme={'blue'}
                        variant='subtle'
                        w={'100%'}
                        textAlign={'center'}
                      >
                        {v.manufacturer}
                      </Badge>
                    </GridItem>
                    <GridItem w={'1fr'}>
                      <Badge
                        colorScheme={'purple'}
                        variant='subtle'
                        w={'100%'}
                        textAlign={'center'}
                      >
                        {v.medicalDoctor}
                      </Badge>
                    </GridItem>
                    <GridItem w={'1fr'}>
                      <Badge
                        colorScheme={'purple'}
                        variant='subtle'
                        w={'100%'}
                        textAlign={'center'}
                      >
                        {v.lotNumber}
                      </Badge>
                    </GridItem>
                  </Grid>
                </Stack>
              ))}
            </Flex>
          )}
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
