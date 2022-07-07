import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { getSomeDiseases, Disease } from '../../core/mockData/disease';
import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { MockRecommendations } from '../../core/mockData/mockRecommendation';
import { getColorByStatus, getIconByStatus } from '../../theme/theme';
import React from 'react';

export function ImmunizationWiki() {
  const diseases: Disease[] = getSomeDiseases();
  const [showInfo, setShowInfo] = useBoolean();
  // Into each entry of a disease, add whether the user has a recommendation getting an immunization against that disease
  // TODO: Include completed immunizations
  diseases.map((disease) => {
    disease.personalRecommendation = MockRecommendations[0].recommendation.find(
      (recommendation) => recommendation.targetDisease?.text === disease.name
    );
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
        {diseases.map((disease) => (
          <div>
            <Link to={`/dashboard/wiki/${disease.code}`}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                pt={4}
              >
                <Text
                  fontSize={'xl'}
                  color={getColorByStatus(
                    disease.personalRecommendation?.forecastStatus.text,
                    'black'
                  )}
                >
                  {disease.name}
                </Text>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  {disease.personalRecommendation !== undefined &&
                    disease.personalRecommendation.forecastStatus.text &&
                    disease.personalRecommendation.forecastStatus.text.length >
                      0 && (
                      <Icon
                        mt={'auto'}
                        mb={'auto'}
                        ml='3'
                        as={getIconByStatus(
                          disease.personalRecommendation.forecastStatus.text
                        )}
                        color={
                          getColorByStatus(
                            disease.personalRecommendation.forecastStatus.text,
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
