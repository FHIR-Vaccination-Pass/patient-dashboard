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
import {
  getColorByStatus,
  getIconByStatus,
  VaccinationStatus,
} from '../../theme/theme';
import React from 'react';
import { Disease } from '../../core/models/Disease';
import { useMapper } from '../../core/services/server/ResourceMapperContext';
import { ImmunizationRecommendation } from '../../core/models/ImmunizationRecommendation';

class WikiInformationCard {
  private _disease: Disease;
  private _recommendation: ImmunizationRecommendation | undefined;

  constructor(disease: Disease) {
    this._disease = disease;
    this._recommendation = undefined;
  }

  get disease(): Disease {
    return this._disease;
  }

  set disease(value: Disease) {
    this._disease = value;
  }

  get recommendation(): ImmunizationRecommendation | undefined {
    return this._recommendation;
  }

  set recommendation(value: ImmunizationRecommendation | undefined) {
    this._recommendation = value;
  }
}

export function ImmunizationWiki() {
  const mapper = useMapper();
  const diseases: Disease[] = mapper.getDiseases();
  const recommendations: ImmunizationRecommendation[] =
    mapper.getRecommendations();
  const [showInfo, setShowInfo] = useBoolean();

  const wikiInformationCards: Map<string, WikiInformationCard> = new Map<
    string,
    WikiInformationCard
  >();

  diseases.forEach((disease: Disease) => {
    wikiInformationCards.set(disease.id, new WikiInformationCard(disease));
  });

  recommendations.forEach((recommendation: ImmunizationRecommendation) => {
    const diseaseIds: string[] | undefined = mapper.getVaccineByVaccineCode(
      recommendation.vaccineCode
    )?.targetDiseaseIds;

    if (diseaseIds !== undefined) {
      diseaseIds.forEach((diseaseId: string) => {
        let card: WikiInformationCard | undefined =
          wikiInformationCards.get(diseaseId);
        if (card !== undefined) {
          card.recommendation = recommendation;
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
        <InfoIcon mr={2} boxSize={6} onClick={setShowInfo.toggle}></InfoIcon>
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
            <Link to={`/dashboard/wiki/${card.disease.code.text}`}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                pt={4}
              >
                <Text
                  fontSize={'xl'}
                  color={getColorByStatus(
                    card.recommendation?.forecastStatus
                      .text as VaccinationStatus,
                    'black'
                  )}
                >
                  {card.disease.name}
                </Text>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  {card.recommendation !== undefined &&
                    card.recommendation.forecastStatus.text &&
                    card.recommendation.forecastStatus.text.length > 0 &&
                    getIconByStatus(
                      card.recommendation.forecastStatus
                        .text as VaccinationStatus
                    ) !== undefined && (
                      <Icon
                        mt={'auto'}
                        mb={'auto'}
                        ml='3'
                        as={getIconByStatus(
                          card.recommendation.forecastStatus
                            .text as VaccinationStatus
                        )}
                        color={
                          getColorByStatus(
                            card.recommendation.forecastStatus
                              .text as VaccinationStatus,
                            'black'
                          ) + '.400'
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
