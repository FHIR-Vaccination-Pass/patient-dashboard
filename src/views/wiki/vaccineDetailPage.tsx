import { PopulationRecommendation } from '../../core/models/PopulationRecommendation';
import React from 'react';
import WorldMap from '../../assets/worldMaps/WorldMap.svg';
import { FaChevronDown, FaChevronUp, FaFolderOpen } from 'react-icons/fa';
import { Disease } from '../../core/models/Disease';
import { Immunization } from '../../core/models/Immunization';
import { ImmunizationRecommendation } from '../../core/models/ImmunizationRecommendation';
import { Medication } from '../../core/models/Medication';
import { useLocation } from 'react-router-dom';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';

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
import { VaccinationDoseSingle } from '../../core/models/VaccinationDose';
import { calcAggregateImmunizationStatus } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { resolvePractitionerName } from '../../core/services/util/resolveHumanName';
import { targetDiseaseApi } from '../../core/services/redux/fhir/targetDiseaseApi';

class DiseaseWikiInfo {
  get populationRecommendation(): PopulationRecommendation | undefined {
    return this._populationRecommendation;
  }

  set populationRecommendation(value: PopulationRecommendation | undefined) {
    this._populationRecommendation = value;
  }

  private _disease: Disease | undefined;
  private _immunizations: Immunization[];
  private _recommendations: ImmunizationRecommendation[];
  private _medications: Medication[];
  private _populationRecommendation: PopulationRecommendation | undefined;

  constructor(disease: Disease | undefined) {
    this._disease = disease;
    this._immunizations = [];
    this._recommendations = [];
    this._medications = [];
    this._populationRecommendation = undefined;
  }

  get disease(): Disease | undefined {
    return this._disease;
  }

  set disease(value: Disease | undefined) {
    this._disease = value;
  }

  get immunizations(): Immunization[] {
    return this._immunizations;
  }

  set immunizations(value: Immunization[]) {
    this._immunizations = value;
  }

  get recommendations(): ImmunizationRecommendation[] {
    return this._recommendations;
  }

  set recommendations(value: ImmunizationRecommendation[]) {
    this._recommendations = value;
  }

  get medications(): Medication[] {
    return this._medications;
  }

  set medications(value: Medication[]) {
    this._medications = value;
  }

  public addMedication(medication: Medication) {
    this._medications.push(medication);
  }

  public addImmunizatuion(immunization: Immunization) {
    this._immunizations.push(immunization);
  }
}

export function VaccineDetailPage() {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const mapper = useMapper();
  const diseaseCode: string = pathComponents[pathComponents.length - 1];

  const { data: targetDisease } =
    targetDiseaseApi.endpoints.getTargetDiseaseById.useQuery(diseaseCode, {});
  const diseaseWikiInfo: DiseaseWikiInfo = new DiseaseWikiInfo(targetDisease);

  mapper.getImmunizations().forEach((immunization: Immunization) => {
    const vaccine: Medication | undefined = mapper.getMedicationByVaccineCode(
      immunization.vaccineCode
    );
    if (vaccine !== undefined) {
      let included: boolean = false;
      vaccine.targetDiseaseIds.forEach((id) => {
        if (id === targetDisease?.id) included = true;
      });
      if (included) diseaseWikiInfo.addImmunizatuion(immunization);
    }
  });

  mapper
    .getRecommendations()
    .forEach((recommendation: ImmunizationRecommendation) => {
      const medication: Medication | undefined =
        mapper.getMedicationByVaccineCode(recommendation.vaccineCode);
      if (medication !== undefined) {
        medication.targetDiseaseIds.forEach((id) => {
          if (id === targetDisease?.id) {
            if (diseaseWikiInfo.recommendations !== undefined) {
              diseaseWikiInfo.recommendations.push(recommendation);
            } else {
              diseaseWikiInfo.recommendations = [recommendation];
            }
          }
        });
      }
    });

  targetDisease?.vaccineIds.forEach((vaccineId: string) => {
    const vaccine: Medication | undefined = mapper.getMedicationById(vaccineId);
    if (vaccine !== undefined) {
      diseaseWikiInfo.addMedication(vaccine);
    }
  });

  diseaseWikiInfo.populationRecommendation =
    mapper.getPopulationRecommendationById(
      targetDisease?.populationRecommendationId ?? ''
    );

  const status = calcAggregateImmunizationStatus(
    diseaseWikiInfo.recommendations
  );
  const [showPersonalizedInfo, setShowPersonalizedInfo] = useBoolean(false);
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
            backgroundColor={status.backgroundColor}
            h={'60px'}
            alignItems={'center'}
            style={{ width: '100%' }}
            borderRadius={'15px 15px 0 0'}
            onClick={setShowPersonalizedInfo.toggle}
          >
            <Flex
              justifyContent={'space-between'}
              flexDirection={'column'}
              w={'100%'}
            >
              <Text ml={'20px'} fontSize={'xl'}>
                {diseaseWikiInfo.disease?.name}
              </Text>
              {diseaseWikiInfo.recommendations.length > 0 && (
                <Text ml={'20px'} color={'gray.600'} fontSize={'14px'}>
                  {status.headline}
                </Text>
              )}
            </Flex>
            <Flex alignItems={'center'} mr={'20px'}>
              {diseaseWikiInfo.recommendations.length > 0 && (
                <Icon
                  mt={'auto'}
                  mb={'auto'}
                  mr='3'
                  as={status.icon}
                  color={status.iconColor}
                  w={6}
                  h={6}
                />
              )}
              {!showPersonalizedInfo && <FaChevronDown size={18} />}
              {showPersonalizedInfo && <FaChevronUp size={18} />}
            </Flex>
          </Flex>
          {showPersonalizedInfo && (
            <Flex
              bg={status.backgroundColor}
              w={'100%'}
              mt={'0px !important'}
              pt={'5px'}
              flexDirection={'column'}
              pb={'10px'}
            >
              {diseaseWikiInfo.recommendations.length > 0 && (
                <Text color={'gray.600'} ml={'20px'} mb={'5px'}>
                  Due vaccinations
                </Text>
              )}

              {diseaseWikiInfo.recommendations.map(
                (recommendation: ImmunizationRecommendation) => (
                  <Stack
                    m={'0px 20px 5px 20px'}
                    bg={'gray.100'}
                    boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
                    borderRadius={'5px'}
                    overflow={'hidden'}
                  >
                    <Grid
                      templateColumns='1fr 1fr'
                      templateRows='1fr 1fr'
                      columnGap={'10px'}
                      p={'5px'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      mb={'3px'}
                    >
                      <GridItem>
                        <Text w={'1fr'}>
                          {
                            mapper.getMedicationByVaccineCode(
                              recommendation.vaccineCode
                            )?.tradeName
                          }
                        </Text>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'orange'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {recommendation.recommendedStartDate.toDateString()}
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'blue'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {
                            mapper.getOrganizationById(
                              mapper.getMedicationByVaccineCode(
                                recommendation.vaccineCode
                              )?.manufacturerId || ''
                            )?.name
                          }
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'gray'}
                          variant='solid'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          Dose:{' '}
                          {
                            // TODO: Can this be done more efficient?
                            (
                              mapper.getVaccinationDoseById(
                                recommendation.vaccinationDoseId
                              ) as VaccinationDoseSingle
                            )?.numberInScheme
                          }{' '}
                          /{' '}
                          {mapper.getNumberOfDosesByMedicationId(
                            mapper.getMedicationByVaccineCode(
                              recommendation.vaccineCode
                            )?.id
                          )}
                        </Badge>
                      </GridItem>
                    </Grid>
                  </Stack>
                )
              )}

              <Text color={'gray.600'} ml={'20px'} mb={'5px'} mt={'10px'}>
                Previous vaccinations
              </Text>

              {diseaseWikiInfo.immunizations.map(
                (immunization: Immunization) => (
                  <Stack
                    m={'0px 20px 5px 20px'}
                    bg={'gray.100'}
                    boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
                    borderRadius={'5px'}
                    overflow={'hidden'}
                  >
                    <Grid
                      templateColumns='1fr 1fr'
                      templateRows='1fr 1fr 1fr'
                      rowGap={'5px'}
                      columnGap={'10px'}
                      p={'5px'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <GridItem>
                        <Text w={'1fr'}>
                          {
                            mapper.getMedicationByVaccineCode(
                              immunization.vaccineCode
                            )?.tradeName
                          }
                        </Text>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'green'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {immunization.occurrenceTime.toDateString()}
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'blue'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {
                            mapper.getOrganizationById(
                              mapper.getMedicationByVaccineCode(
                                immunization.vaccineCode
                              )?.manufacturerId || ''
                            )?.name
                          }
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'gray'}
                          variant='solid'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          Dose:{' '}
                          {
                            // TODO: Can this be done more efficient?
                            (
                              mapper.getVaccinationDoseById(
                                immunization.vaccinationDoseId
                              ) as VaccinationDoseSingle
                            ).numberInScheme
                          }{' '}
                          /{' '}
                          {mapper.getNumberOfDosesByMedicationId(
                            mapper.getMedicationByVaccineCode(
                              immunization.vaccineCode
                            )?.id
                          )}
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'purple'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {resolvePractitionerName(
                            mapper.getPractitionerById(immunization.performerId)
                              ?.name
                          )}
                        </Badge>
                      </GridItem>
                      <GridItem w={'1fr'}>
                        <Badge
                          colorScheme={'blue'}
                          variant='subtle'
                          w={'100%'}
                          textAlign={'center'}
                        >
                          {immunization.lotNumber}
                        </Badge>
                      </GridItem>
                    </Grid>
                  </Stack>
                )
              )}
              {diseaseWikiInfo.immunizations.length === 0 && (
                <Stack justifyContent={'space-between'} alignItems={'center'}>
                  <Icon as={FaFolderOpen} color={'gray.500'} w={20} h={20} />
                  <Box pb={'15px'}>
                    <Text color={'gray.500'}>No vaccinations yet</Text>
                  </Box>
                </Stack>
              )}
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
              <Text color={'gray.500'}>
                {diseaseWikiInfo.disease?.description}
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
                Recommendations
              </Heading>
              <Text color={'gray.500'}>
                The STIKO recommends start immunization for{' '}
                {diseaseWikiInfo.disease?.name} earlies from age{' '}
                {diseaseWikiInfo.populationRecommendation?.ageStart} and latest
                until age {diseaseWikiInfo.populationRecommendation?.ageEnd}.
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
                {diseaseWikiInfo.populationRecommendation?.locations.map(
                  (location) => (
                    <ListItem ml={'10px'}>{location.country}</ListItem>
                  )
                )}
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
                {diseaseWikiInfo.medications.map((vaccine: Medication) => (
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {vaccine.tradeName}
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
                          {
                            mapper.getOrganizationById(vaccine.manufacturerId)
                              ?.name
                          }
                        </Badge>
                      </HStack>
                      <HStack position={'relative'}>
                        <Text>Number of Doses:</Text>
                        <Box
                          width={'100px'}
                          backgroundColor={'gray.100'}
                          textAlign={'center'}
                          position={'absolute'}
                          right={'0px'}
                        >
                          <Text fontSize={'xs'}>
                            {mapper.getNumberOfDosesByMedicationId(vaccine.id)}
                          </Text>
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
