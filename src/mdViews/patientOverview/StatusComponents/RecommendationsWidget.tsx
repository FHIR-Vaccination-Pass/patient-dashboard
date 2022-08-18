import React, { FC } from 'react';
import { Badge, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ImmunizationRecommendation } from '../../../core/models';
import {
  useImmunizationRecommendations,
  useMedicationInfo,
  useMedications,
  useTargetDiseases,
} from '../../../hooks';

export const RecommendationsWidget: FC = ({}) => {
  const params = useParams();
  const patientId = params['patientId'];

  const { data: targetDiseases, idToTargetDisease } = useTargetDiseases({});
  const { immunizationRecommendations } = useImmunizationRecommendations({
    patient: patientId,
  });
  const { data: medicationsData, medications, idToMedication } = useMedications({});
  const {
    idToOrganization,
    vaccinationSchemes,
    idToVaccinationScheme,
    vaccinationDoses,
    idToVaccinationDose,
  } = useMedicationInfo(medications);

  const standardVaccinationSchemes = vaccinationSchemes?.byType['standard'];

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='start'
      h={'100%'}
      w={'100%'}
      overflowY={'scroll'}
    >
      {immunizationRecommendations?.map(
        (recommendation: ImmunizationRecommendation) => {
          const diseases = targetDiseases?.byCode[
            recommendation.targetDisease.coding.code
          ]?.ids.map((irId) => idToTargetDisease(irId)!);
          return diseases?.map((disease) => {
            const med =
              recommendation &&
              idToMedication(
                medicationsData?.byCode[recommendation.vaccineCode.coding.code]
                  ?.ids[0]
              );
            const vs =
              med &&
              idToVaccinationScheme(
                standardVaccinationSchemes?.byMedication[med?.id]?.ids[0]
              );
            const allDoses =
              vs &&
              vaccinationDoses?.byVaccinationScheme[vs.id]?.ids.map(
                idToVaccinationDose
              );
            const dose = idToVaccinationDose(recommendation?.vaccinationDoseId);

            return (
              <Stack>
                <Flex
                  justifyContent={'space-between'}
                  w={'100%'}
                  alignItems={'center'}
                  p={2}
                  pl={6}
                  pr={6}
                >
                  <Text> {disease.name} </Text>
                  <Flex w={'50%'} justifyContent={'end'} alignItems={'center'}>
                    {recommendation && med && vs && allDoses && dose && (
                      <Badge
                        colorScheme={'gray'}
                        variant='solid'
                        w={'100%'}
                        textAlign={'center'}
                        mr={3}
                      >
                        Dose:{' '}
                        {'numberInScheme' in dose!
                          ? `${dose.numberInScheme} / ${allDoses!}`
                          : 'Booster'}
                      </Badge>
                    )}
                    <Link
                      to={`/md/dashboard/patient/${patientId}/diseases/${disease.code.coding.code}`}
                    >
                      <Button colorScheme='blue' w={'5vw'}>
                        Open
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
                <Divider />
              </Stack>
            );
          });
        }
      )}
    </Flex>
  );
};
