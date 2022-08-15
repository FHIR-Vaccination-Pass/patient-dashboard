import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaFolderOpen } from 'react-icons/fa';
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
import { skipToken } from '@reduxjs/toolkit/query';

import WorldMap from '../../../assets/worldMaps/WorldMap.svg';
import { calcAggregateImmunizationStatus } from '../../../components/dashboard/immunizationStatus/immunizationStatusCard';
import {
  Disease,
  DiseaseMapper,
  Immunization,
  ImmunizationMapper,
  ImmunizationRecommendationMapper,
  MedicationMapper,
  OrganizationMapper,
  PopulationRecommendationMapper,
  PractitionerMapper,
  VaccinationDoseMapper,
  VaccinationSchemeMapper,
} from '../../../core/models';
import {
  immunizationApi,
  immunizationRecommendationApi,
  medicationApi,
  organizationApi,
  populationRecommendationApi,
  practitionerApi,
  targetDiseaseApi,
  vaccinationDoseApi,
  vaccinationSchemeApi,
} from '../../../core/services/redux/fhir';

import { ImmunizationCard, RecommendationCard } from '.';

interface VaccineDetailHeaderProps {
  disease: Disease;
}
const VaccineDetailHeader: FC<VaccineDetailHeaderProps> = ({ disease }) => {
  const { data: medications } = medicationApi.endpoints.get.useQuery({});
  const medicationsForDisease =
    medications?.byTargetDisease[disease.code.coding];
  const medicationsForDiseaseMapped = medicationsForDisease?.ids.map((mId) =>
    MedicationMapper.fromResource(medications!.entities[mId])
  );

  const { data: organizations } = organizationApi.endpoints.get.useQuery({});

  const { data: practitioners } = practitionerApi.endpoints.get.useQuery({});

  const { data: vaccinationSchemes } =
    vaccinationSchemeApi.endpoints.get.useQuery(
      medicationsForDiseaseMapped
        ? {
            subject: medicationsForDiseaseMapped.map((med) => med.id).join(','),
          }
        : skipToken
    );
  const standardVaccinationSchemes = vaccinationSchemes?.byType['standard'];
  const standardVaccinationSchemesMapped = standardVaccinationSchemes?.ids.map(
    (vsId) =>
      VaccinationSchemeMapper.fromResource(vaccinationSchemes!.entities[vsId])
  );

  const { data: vaccinationDoses } = vaccinationDoseApi.endpoints.get.useQuery(
    standardVaccinationSchemesMapped
      ? {
          subject: standardVaccinationSchemesMapped
            .map((vs) => vs.id)
            .join(','),
        }
      : skipToken
  );

  const { data: immunizations } = immunizationApi.endpoints.get.useQuery(
    medicationsForDiseaseMapped
      ? {
          'vaccine-code': medicationsForDiseaseMapped
            .map((m) => m.code.coding)
            .join(','),
        }
      : skipToken
  );
  const immunizationsMapped = immunizations?.ids.map((iId) =>
    ImmunizationMapper.fromResource(immunizations.entities[iId])
  );

  const { data: immunizationRecommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery(
      medicationsForDiseaseMapped
        ? {
            'vaccine-type': medicationsForDiseaseMapped
              .map((m) => m.code.coding)
              .join(','),
          }
        : skipToken
    );

  const immunizationRecommendationsMapped =
    immunizationRecommendations?.ids.map((irId) =>
      ImmunizationRecommendationMapper.fromResource(
        immunizationRecommendations.entities[irId]
      )
    );

  const [showPersonalizedInfo, setShowPersonalizedInfo] = useBoolean(false);
  const status = calcAggregateImmunizationStatus(
    immunizationRecommendationsMapped ?? []
  );

  return (
    <>
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
            {disease.name}
          </Text>
          <Text ml={'20px'} color={'gray.600'} fontSize={'14px'}>
            {status.headline}
          </Text>
        </Flex>
        <Flex alignItems={'center'} mr={'20px'}>
          <Icon
            mt={'auto'}
            mb={'auto'}
            mr='3'
            as={status.icon}
            color={status.iconColor}
            w={6}
            h={6}
          />
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
          {immunizationRecommendationsMapped &&
            immunizationRecommendationsMapped.length > 0 && (
              <Text color={'gray.600'} ml={'20px'} mb={'5px'}>
                Due vaccinations
              </Text>
            )}

          {medicationsForDisease &&
            organizations &&
            standardVaccinationSchemes &&
            vaccinationDoses &&
            immunizationRecommendationsMapped?.map((ir) => {
              const med = MedicationMapper.fromResource(
                medications.entities[
                  medicationsForDisease.byCode[ir.vaccineCode.coding].ids[0]
                ]
              );
              const organization = OrganizationMapper.fromResource(
                organizations.entities[med.manufacturerId]
              );
              const vaccinationSchemeId =
                standardVaccinationSchemes.byMedication[med.id].ids[0];
              const allDoses =
                vaccinationDoses.byVaccinationScheme[vaccinationSchemeId];
              const dose = VaccinationDoseMapper.fromResource(
                vaccinationDoses.entities[ir.vaccinationDoseId]
              );

              return (
                <RecommendationCard
                  recommendation={ir}
                  medication={med}
                  organization={organization}
                  numberOfDoses={allDoses.ids.length}
                  vaccinationDose={dose}
                />
              );
            })}

          <Text color={'gray.600'} ml={'20px'} mb={'5px'} mt={'10px'}>
            Previous vaccinations
          </Text>

          {medicationsForDisease &&
          organizations &&
          practitioners &&
          standardVaccinationSchemes &&
          vaccinationDoses &&
          immunizationsMapped ? (
            immunizationsMapped.map((imm: Immunization) => {
              const med = MedicationMapper.fromResource(
                medications.entities[
                  medicationsForDisease.byCode[imm.vaccineCode.coding].ids[0]
                ]
              );
              const organization = OrganizationMapper.fromResource(
                organizations.entities[med.manufacturerId]
              );
              const pracitioner = PractitionerMapper.fromResource(
                practitioners.entities[imm.performerId]
              );
              const vaccinationSchemeId =
                standardVaccinationSchemes.byMedication[med.id].ids[0];
              const allDoses =
                vaccinationDoses.byVaccinationScheme[vaccinationSchemeId];
              const dose = VaccinationDoseMapper.fromResource(
                vaccinationDoses.entities[imm.vaccinationDoseId]
              );

              return (
                <ImmunizationCard
                  immunization={imm}
                  medication={med}
                  organization={organization}
                  practitioner={pracitioner}
                  numberOfDoses={allDoses.ids.length}
                  vaccinationDose={dose}
                />
              );
            })
          ) : (
            <Stack justifyContent={'space-between'} alignItems={'center'}>
              <Icon as={FaFolderOpen} color={'gray.500'} w={20} h={20} />
              <Box pb={'15px'}>
                <Text color={'gray.500'}>No vaccinations yet</Text>
              </Box>
            </Stack>
          )}
        </Flex>
      )}
    </>
  );
};

interface VaccineDetailBodyProps {
  disease: Disease;
}
const VaccineDetailBody: FC<VaccineDetailBodyProps> = ({ disease }) => {
  const { data: populationRecommendations } =
    populationRecommendationApi.endpoints.get.useQuery({});
  const populationRecommendationMapped = populationRecommendations?.byDisease[
    disease.code.coding
  ].ids.map((prId) =>
    PopulationRecommendationMapper.fromResource(
      populationRecommendations.entities[prId]
    )
  )[0];

  const { data: medications } = medicationApi.endpoints.get.useQuery({});
  const medicationsForDisease =
    medications?.byTargetDisease[disease.code.coding];
  const medicationsForDiseaseMapped = medicationsForDisease?.ids.map((mId) =>
    MedicationMapper.fromResource(medications!.entities[mId])
  );

  const { data: organizations } = organizationApi.endpoints.get.useQuery({});

  const { data: vaccinationSchemes } =
    vaccinationSchemeApi.endpoints.get.useQuery(
      medicationsForDiseaseMapped
        ? {
            subject: medicationsForDiseaseMapped.map((med) => med.id).join(','),
          }
        : skipToken
    );
  const standardVaccinationSchemes = vaccinationSchemes?.byType['standard'];
  const standardVaccinationSchemesMapped = standardVaccinationSchemes?.ids.map(
    (vsId) =>
      VaccinationSchemeMapper.fromResource(vaccinationSchemes!.entities[vsId])
  );

  const { data: vaccinationDoses } = vaccinationDoseApi.endpoints.get.useQuery(
    standardVaccinationSchemesMapped
      ? {
          subject: standardVaccinationSchemesMapped
            .map((vs) => vs.id)
            .join(','),
        }
      : skipToken
  );

  const generatePopulationRecommendationText = () => {
    if (populationRecommendationMapped === undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} for all
          ages.
        </Text>
      );
    }
    if (
      populationRecommendationMapped.ageStart !== undefined &&
      populationRecommendationMapped.ageEnd !== undefined
    ) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} earliest
          from age {populationRecommendationMapped.ageStart} and latest until
          age {populationRecommendationMapped.ageEnd}.
        </Text>
      );
    }
    if (populationRecommendationMapped.ageStart !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} earliest
          from age {populationRecommendationMapped.ageStart}.
        </Text>
      );
    }
    if (populationRecommendationMapped.ageEnd !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} latest
          until age {populationRecommendationMapped.ageEnd}.
        </Text>
      );
    }

    return (
      <Text color={'gray.500'}>
        The STIKO does not see a need to vaccinate against {disease.name} at
        this time.
      </Text>
    );
  };

  return (
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
        <Text color={'gray.500'}>{disease.description}</Text>
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
        {generatePopulationRecommendationText()}
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
          {populationRecommendationMapped?.locations.map((location) => (
            <ListItem ml={'10px'}>{location.country}</ListItem>
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
          {medicationsForDiseaseMapped &&
            organizations &&
            standardVaccinationSchemes &&
            vaccinationDoses &&
            medicationsForDiseaseMapped.map((med) => {
              const organization = OrganizationMapper.fromResource(
                organizations.entities[med.manufacturerId]
              );
              const vaccinationSchemeId =
                standardVaccinationSchemes.byMedication[med.id].ids[0];
              const doses =
                vaccinationDoses.byVaccinationScheme[vaccinationSchemeId];

              return (
                <AccordionItem>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {med.tradeName}
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
                        {organization?.name}
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
                        <Text fontSize={'xs'}>{doses.ids.length}</Text>
                      </Box>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </Box>
    </VStack>
  );
};

export function VaccineDetailPage() {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const diseaseCode: string = pathComponents[pathComponents.length - 1];

  const { data: targetDiseases } = targetDiseaseApi.endpoints.get.useQuery({});
  const targetDiseaseMapped = targetDiseases?.byCode[diseaseCode].ids.map(
    (tdId) => DiseaseMapper.fromResource(targetDiseases.entities[tdId])
  )[0];

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
          {targetDiseaseMapped && (
            <VaccineDetailHeader disease={targetDiseaseMapped} />
          )}
          {targetDiseaseMapped && (
            <VaccineDetailBody disease={targetDiseaseMapped} />
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
