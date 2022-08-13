import { PopulationRecommendation } from '../../../core/models/PopulationRecommendation';
import React, { FC } from 'react';
import WorldMap from '../../../assets/worldMaps/WorldMap.svg';
import { FaChevronDown, FaChevronUp, FaFolderOpen } from 'react-icons/fa';
import { Disease, DiseaseMapper } from '../../../core/models/Disease';
import {
  Immunization,
  ImmunizationMapper,
} from '../../../core/models/Immunization';
import {
  ImmunizationRecommendation,
  ImmunizationRecommendationMapper,
} from '../../../core/models/ImmunizationRecommendation';
import { Medication, MedicationMapper } from '../../../core/models/Medication';
import { useLocation } from 'react-router-dom';
import { useMapper } from '../../../core/services/resourceMapper/ResourceMapperContext';

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
import { calcAggregateImmunizationStatus } from '../../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { targetDiseaseApi } from '../../../core/services/redux/fhir/targetDiseaseApi';
import { immunizationApi } from '../../../core/services/redux/fhir/immunizationApi';
import { medicationApi } from '../../../core/services/redux/fhir/medicationApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { immunizationRecommendationApi } from '../../../core/services/redux/fhir/immunizationRecommendationApi';
import { ImmunizationCard, RecommendationCard } from '.';

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
  const mapper = useMapper();

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
        <Text color={'gray.500'}>
          The STIKO recommends start immunization for {disease.name} earlies
          from age {populationRecommendation?.ageStart} and latest until age{' '}
          {populationRecommendation?.ageEnd}.
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
          {medications.map((vaccine: Medication) => (
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
                    {mapper.getOrganizationById(vaccine.manufacturerId)?.name}
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
  );
};

export function VaccineDetailPage() {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const mapper = useMapper();
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

  const diseaseWikiInfo: DiseaseWikiInfo = new DiseaseWikiInfo(targetDisease);

  immunizations?.forEach((immunization) =>
    diseaseWikiInfo.addImmunizatuion(immunization)
  );
  medications?.forEach((medication) =>
    diseaseWikiInfo.addMedication(medication)
  );
  recommendations?.forEach((recommendation) =>
    diseaseWikiInfo.recommendations.push(recommendation)
  );

  diseaseWikiInfo.populationRecommendation =
    mapper.getPopulationRecommendationById(
      targetDisease?.populationRecommendationId ?? ''
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
              populationRecommendation={
                diseaseWikiInfo.populationRecommendation
              }
            />
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
