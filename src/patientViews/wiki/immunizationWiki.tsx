import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import { Disease } from '../../core/models/Disease';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { ImmunizationRecommendation } from '../../core/models/ImmunizationRecommendation';
import { calcAggregateImmunizationStatus } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';

class WikiInformationCard {
  private _disease: Disease;
  private _recommendations: ImmunizationRecommendation[];

  constructor(disease: Disease) {
    this._disease = disease;
    this._recommendations = [];
  }

  get disease(): Disease {
    return this._disease;
  }

  set disease(value: Disease) {
    this._disease = value;
  }

  get recommendations(): ImmunizationRecommendation[] {
    return this._recommendations;
  }

  set recommendations(value: ImmunizationRecommendation[]) {
    this._recommendations = value;
  }
}

export function ImmunizationWiki() {
  const mapper = useMapper();
  const diseases: Disease[] = mapper.getAllDiseases();
  const recommendations: ImmunizationRecommendation[] =
    mapper.getAllRecommendations();
  const [showInfo, setShowInfo] = useBoolean();

  const wikiInformationCards: Map<string, WikiInformationCard> = new Map<
    string,
    WikiInformationCard
  >();

  diseases.forEach((disease: Disease) => {
    wikiInformationCards.set(disease.id, new WikiInformationCard(disease));
  });

  recommendations.forEach((recommendation: ImmunizationRecommendation) => {
    const diseaseIds: string[] | undefined = mapper.getMedicationByVaccineCode(
      recommendation.vaccineCode
    )?.targetDiseaseIds;

    if (diseaseIds !== undefined) {
      diseaseIds.forEach((diseaseId: string) => {
        let card: WikiInformationCard | undefined =
          wikiInformationCards.get(diseaseId);
        if (card !== undefined) {
          card.recommendations.push(recommendation);
          wikiInformationCards.set(diseaseId, card);
        }
      });
    }
  });

  return (
    <Box pb={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={'20px'}>
        <Text fontSize={'2xl'} textAlign={'center'} ml={'3px'}>
          Immunization Wiki
        </Text>
        <InfoIcon
          mr={2}
          boxSize={6}
          onClick={setShowInfo.toggle}
          color={'gray.600'}
        ></InfoIcon>
      </Flex>
      {showInfo && (
        <Text mb={'15px'} ml={'5px'} color={'gray.500'}>
          All information provided in this wiki are according to the STIKO. The
          information provided is enhanced with your personal data to give you
          more insights about your immunisation.
        </Text>
      )}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
        borderRadius={'10px'}
        w={'100%'}
        mb={'10px'}
        pl={5}
        pr={5}
      >
        {Array.from(wikiInformationCards.values()).map((card) => (
          <div>
            <Link
              to={`/patient/dashboard/wiki/${card.disease.code.coding.code}`}
            >
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                pt={4}
              >
                <Text
                  fontSize={'xl'}
                  color={
                    calcAggregateImmunizationStatus(card.recommendations)
                      .iconColor
                  }
                >
                  {card.disease.name}
                </Text>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  {card.recommendations.length > 0 && (
                    <Icon
                      mt={'auto'}
                      mb={'auto'}
                      ml='3'
                      as={
                        calcAggregateImmunizationStatus(card.recommendations)
                          .icon
                      }
                      color={
                        calcAggregateImmunizationStatus(card.recommendations)
                          .iconColor
                      }
                      w={6}
                      h={6}
                    />
                  )}
                  <ChevronRightIcon ml={5} boxSize={8}></ChevronRightIcon>
                </Flex>
              </Flex>
            </Link>
            <Divider orientation='horizontal' mt={'10px'} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
