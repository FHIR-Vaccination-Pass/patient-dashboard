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
import { Disease } from '../../../core/models';

import { ImmunizationCard, RecommendationCard } from './index';
import {
  useImmunizationRecommendations,
  useImmunizations,
  useMedicationInfo,
  useMedications,
  usePopulationRecommendations,
  usePractitioners,
  useTargetDiseases,
} from '../../../hooks';

interface VaccineDetailHeaderProps {
  disease: Disease;
}

const VaccineDetailHeader: FC<VaccineDetailHeaderProps> = ({ disease }) => {
  const { data: medications, idToMedication } = useMedications({});
  const medicationsForDisease =
    medications?.byTargetDisease[disease.code.coding.code];
  const { idToPractitioner } = usePractitioners({});
  const { data: immunizations, idToImmunization } = useImmunizations(
    medicationsForDisease
      ? {
          'vaccine-code': medicationsForDisease.ids
            .map(idToMedication)
            .map((m) => m!.code.coding.code)
            .join(','),
        }
      : skipToken
  );
  const { data: immunizationRecommendations, idToImmunizationRecommendation } =
    useImmunizationRecommendations(
      medicationsForDisease
        ? {
            'vaccine-type': medicationsForDisease.ids
              .map(idToMedication)
              .map((m) => m!.code.coding.code)
              .join(','),
          }
        : skipToken
    );

  const {
    idToOrganization,
    vaccinationSchemesData,
    idToVaccinationScheme,
    vaccinationDosesData,
    idToVaccinationDose,
  } = useMedicationInfo(
    medicationsForDisease?.ids.map((id: string) => idToMedication(id)!)
  );
  const standardVaccinationSchemes = vaccinationSchemesData?.byType['standard'];

  const [showPersonalizedInfo, setShowPersonalizedInfo] = useBoolean(false);
  const status = calcAggregateImmunizationStatus(
    immunizationRecommendations?.ids.map(
      (id: string) => idToImmunizationRecommendation(id)!
    ) ?? []
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
          {immunizationRecommendations &&
            immunizationRecommendations.ids.length > 0 && (
              <Text color={'gray.600'} ml={'20px'} mb={'5px'}>
                Due vaccinations
              </Text>
            )}

          {immunizationRecommendations?.ids.map((irId: string) => {
            const ir = idToImmunizationRecommendation(irId);
            const med =
              ir &&
              idToMedication(
                medicationsForDisease?.byCode[ir.vaccineCode.coding.code]
                  ?.ids[0]
              );
            const org = idToOrganization(med?.manufacturerId);
            const vs =
              med &&
              idToVaccinationScheme(
                standardVaccinationSchemes?.byMedication[med?.id]?.ids[0]
              );
            const allDoses =
              vs &&
              vaccinationDosesData?.byVaccinationScheme[vs.id]?.ids.map(
                idToVaccinationDose
              );
            const dose = idToVaccinationDose(ir?.vaccinationDoseId);

            return (
              ir &&
              med &&
              org &&
              vs &&
              allDoses &&
              dose && (
                <RecommendationCard
                  key={irId}
                  recommendation={ir}
                  medication={med}
                  organization={org}
                  numberOfDoses={allDoses.length}
                  vaccinationDose={dose}
                />
              )
            );
          })}

          <Text color={'gray.600'} ml={'20px'} mb={'5px'} mt={'10px'}>
            Previous vaccinations
          </Text>

          {immunizations ? (
            immunizations.ids.map((iId: string) => {
              const imm = idToImmunization(iId);
              const med =
                imm &&
                idToMedication(
                  medicationsForDisease?.byCode[imm.vaccineCode.coding.code]
                    ?.ids[0]
                );
              const org = idToOrganization(med?.manufacturerId);
              const pract = idToPractitioner(imm?.performerId);
              const vs =
                med &&
                idToVaccinationScheme(
                  standardVaccinationSchemes?.byMedication[med.id]?.ids[0]
                );
              const allDoses =
                vs &&
                vaccinationDosesData?.byVaccinationScheme[vs.id]?.ids.map(
                  idToVaccinationDose
                );
              const dose = idToVaccinationDose(imm?.vaccinationDoseId);

              return (
                imm &&
                med &&
                org &&
                pract &&
                allDoses &&
                dose && (
                  <ImmunizationCard
                    key={iId}
                    immunization={imm}
                    medication={med}
                    organization={org}
                    practitioner={pract}
                    numberOfDoses={allDoses.length}
                    vaccinationDose={dose}
                  />
                )
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
  const { data: populationRecommendations, idToPopulationRecommendation } =
    usePopulationRecommendations({});
  const pr = idToPopulationRecommendation(
    populationRecommendations?.byDisease[disease.code.coding.code]?.ids[0]
  );

  const { data: medications, idToMedication } = useMedications({});
  const medicationsForDisease =
    medications?.byTargetDisease[disease.code.coding.code];

  const {
    idToOrganization,
    vaccinationSchemesData,
    idToVaccinationScheme,
    vaccinationDosesData,
    idToVaccinationDose,
  } = useMedicationInfo(
    medicationsForDisease?.ids.map((id: string) => idToMedication(id)!)
  );
  const standardVaccinationSchemes = vaccinationSchemesData?.byType['standard'];

  const generatePopulationRecommendationText = () => {
    if (pr === undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} for all
          ages.
        </Text>
      );
    }
    if (pr.ageStart !== undefined && pr.ageEnd !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} earliest
          from age {pr.ageStart} and latest until age {pr.ageEnd}.
        </Text>
      );
    }
    if (pr.ageStart !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} earliest
          from age {pr.ageStart}.
        </Text>
      );
    }
    if (pr.ageEnd !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends to start immunization for {disease.name} latest
          until age {pr.ageEnd}.
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
          {pr?.locations.map((location) => (
            <ListItem key={`${location.country}/${location.state}`} ml={'10px'}>
              {location.country}
            </ListItem>
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
          {medicationsForDisease?.ids.map((mId: string) => {
            const med = idToMedication(mId);
            const org = idToOrganization(med?.manufacturerId);
            const vs =
              med &&
              idToVaccinationScheme(
                standardVaccinationSchemes?.byMedication[med.id]?.ids[0]
              );
            const doses =
              vs &&
              vaccinationDosesData?.byVaccinationScheme[vs.id]?.ids.map(
                idToVaccinationDose
              );

            return (
              <AccordionItem key={mId}>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    {med?.tradeName}
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
                      {org?.name}
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
                      <Text fontSize={'xs'}>{doses?.length}</Text>
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

  const { data: targetDiseases, idToTargetDisease } = useTargetDiseases({});
  const targetDisease = idToTargetDisease(
    targetDiseases?.byCode[diseaseCode]?.ids[0]
  );

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
          {targetDisease && <VaccineDetailHeader disease={targetDisease} />}
          {targetDisease && <VaccineDetailBody disease={targetDisease} />}
        </VStack>
      </Flex>
    </Box>
  );
}
