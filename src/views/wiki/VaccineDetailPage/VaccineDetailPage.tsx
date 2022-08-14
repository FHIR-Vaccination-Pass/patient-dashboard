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
  ImmunizationRecommendation,
  ImmunizationRecommendationMapper,
  Medication,
  MedicationMapper,
  PopulationRecommendation,
  PopulationRecommendationMapper,
} from '../../../core/models';
import {
  immunizationApi,
  immunizationRecommendationApi,
  medicationApi,
  populationRecommendationApi,
  targetDiseaseApi,
} from '../../../core/services/redux/fhir';
import { useMedicationGraph } from '../../../hooks';

import { ImmunizationCard, RecommendationCard } from '.';

interface VaccineDetailHeaderProps {
  disease: Disease;
  medications: Medication[];
  immunizations: Immunization[];
  recommendations: ImmunizationRecommendation[];
}
const VaccineDetailHeader: FC<VaccineDetailHeaderProps> = ({
  disease,
  medications,
  immunizations,
  recommendations,
}) => {
  const [showPersonalizedInfo, setShowPersonalizedInfo] = useBoolean(false);
  const status = calcAggregateImmunizationStatus(recommendations);

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
          {recommendations.length > 0 && (
            <Text color={'gray.600'} ml={'20px'} mb={'5px'}>
              Due vaccinations
            </Text>
          )}

          {recommendations.map((recommendation: ImmunizationRecommendation) => (
            <RecommendationCard
              recommendation={recommendation}
              medication={
                medications.find(
                  (medication) =>
                    medication.code.coding === recommendation.vaccineCode.coding
                )!
              }
            />
          ))}

          <Text color={'gray.600'} ml={'20px'} mb={'5px'} mt={'10px'}>
            Previous vaccinations
          </Text>

          {immunizations ? (
            immunizations.map((immunization: Immunization) => (
              <ImmunizationCard
                immunization={immunization}
                medication={
                  medications.find(
                    (medication) =>
                      medication.code.coding === immunization.vaccineCode.coding
                  )!
                }
              />
            ))
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
  medications: Medication[];
  populationRecommendation: PopulationRecommendation | undefined;
}
const VaccineDetailBody: FC<VaccineDetailBodyProps> = ({
  disease,
  medications,
  populationRecommendation,
}) => {
  const medicationGraph = useMedicationGraph(medications);

  const generatePopulationRecommendationText = () => {
    if (populationRecommendation === undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends start immunization for {disease.name} for all
          ages.
        </Text>
      );
    }
    if (
      populationRecommendation.ageStart !== undefined &&
      populationRecommendation.ageEnd !== undefined
    ) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends start immunization for {disease.name} earliest
          from age {populationRecommendation.ageStart} and latest until age{' '}
          {populationRecommendation.ageEnd}.
        </Text>
      );
    }
    if (populationRecommendation.ageStart !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends start immunization for {disease.name} earliest
          from age {populationRecommendation.ageStart}.
        </Text>
      );
    }
    if (populationRecommendation.ageEnd !== undefined) {
      return (
        <Text color={'gray.500'}>
          The STIKO recommends start immunization for {disease.name} latest
          until age {populationRecommendation.ageEnd}.
        </Text>
      );
    }

    return (
      <Text color={'gray.500'}>
        The STIKO does not see a need to vacinate against {disease.name} at this
        time.
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
          {populationRecommendation?.locations.map((location) => (
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
          {medicationGraph &&
            Array.from(
              medicationGraph.values(),
              ({ medication, organization, schemes }) => (
                <AccordionItem>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {medication.tradeName}
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
                        <Text fontSize={'xs'}>
                          {
                            Array.from(schemes.values()).find(
                              ({ vaccinationScheme }) =>
                                vaccinationScheme.type === 'standard'
                            )?.doses.size
                          }
                        </Text>
                      </Box>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              )
            )}
        </Accordion>
      </Box>
    </VStack>
  );
};

export function VaccineDetailPage() {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const diseaseCode: string = pathComponents[pathComponents.length - 1];

  const { data: targetDisease } = targetDiseaseApi.endpoints.get.useQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data
          ?.map(DiseaseMapper.fromResource)
          .find((x) => x.code.coding === diseaseCode),
      }),
    }
  );

  const { data: medications } = medicationApi.endpoints.get.useQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data
          ?.map(MedicationMapper.fromResource)
          .filter((medication) =>
            medication.targetDiseaseIds.includes(diseaseCode)
          ),
      }),
    }
  );

  const { data: immunizations } = immunizationApi.endpoints.get.useQuery(
    medications
      ? {
          'vaccine-code': medications
            .map((medication) => medication.code.coding)
            .join(','),
        }
      : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map(ImmunizationMapper.fromResource),
      }),
    }
  );

  const { data: recommendations } =
    immunizationRecommendationApi.endpoints.get.useQuery(
      {
        'target-disease': diseaseCode,
      },
      {
        selectFromResult: (result) => ({
          ...result,
          data: result.data?.map(ImmunizationRecommendationMapper.fromResource),
        }),
      }
    );

  const { data: populationRecommendation } =
    populationRecommendationApi.endpoints.get.useQuery(
      {},
      {
        selectFromResult: (result) => ({
          ...result,
          data: result.data
            ?.map(PopulationRecommendationMapper.fromResource)
            .find((pr) => pr.diseaseId === diseaseCode),
        }),
      }
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
          {targetDisease && medications && immunizations && recommendations && (
            <VaccineDetailHeader
              disease={targetDisease}
              medications={medications}
              immunizations={immunizations}
              recommendations={recommendations}
            />
          )}
          {targetDisease && medications && (
            <VaccineDetailBody
              disease={targetDisease}
              medications={medications}
              populationRecommendation={populationRecommendation}
            />
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
