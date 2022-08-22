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

export const RecommendationsWidget: FC = () => {
  const params = useParams();
  const patientId = params['patientId'];

  const { data: targetDiseases, idToTargetDisease } = useTargetDiseases({});
  const { immunizationRecommendations } = useImmunizationRecommendations({
    patient: patientId,
  });
  const {
    data: medicationsData,
    medications,
    idToMedication,
  } = useMedications({});
  const { idToVaccinationScheme, vaccinationDoses, idToVaccinationDose } =
    useMedicationInfo(medications);

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'100%'}
      w={'100%'}
      overflowY={'scroll'}
    >
      {immunizationRecommendations
        ?.slice()
        .sort((a, b) => {
          const timeA = a?.recommendedStartDate.getTime()?.valueOf() ?? 0;
          const timeB = b?.recommendedStartDate.getTime()?.valueOf() ?? 0;
          return timeA > timeB ? timeA : timeB;
        })
        .map((immRec: ImmunizationRecommendation) => {
          const td = idToTargetDisease(
            targetDiseases?.byCode[immRec.targetDisease.coding.code]?.ids[0]
          );
          const med =
            immRec &&
            idToMedication(
              medicationsData?.byCode[immRec.vaccineCode.coding.code]?.ids[0]
            );
          const dose = idToVaccinationDose(immRec?.vaccinationDoseId);
          const vs = dose && idToVaccinationScheme(dose?.vaccinationSchemeId);
          const allDoses =
            vs &&
            vaccinationDoses?.byVaccinationScheme[vs.id]?.ids.map(
              idToVaccinationDose
            );

          return (
            immRec &&
            med &&
            vs &&
            allDoses &&
            dose &&
            td && (
              <Stack>
                <Flex
                  justifyContent={'space-between'}
                  w={'100%'}
                  alignItems={'center'}
                  p={2}
                  pl={6}
                  pr={6}
                >
                  <Text w={'10vw'}> {td.name} </Text>
                  <Divider orientation={'vertical'} h={'40px'} />
                  <Flex w={'50%'} justifyContent={'end'} alignItems={'center'}>
                    <Badge
                      colorScheme={'orange'}
                      variant='subtle'
                      w={'200px'}
                      textAlign={'center'}
                      mr={3}
                    >
                      Dose:{' '}
                      {'numberInScheme' in dose
                        ? `${dose.numberInScheme} / ${allDoses.length}`
                        : 'Booster'}
                    </Badge>
                    <Link
                      to={`/md/dashboard/patient/${patientId}/record/${td.id}`}
                    >
                      <Button colorScheme='blue' variant={'ghost'}>
                        Details
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
                <Divider />
              </Stack>
            )
          );
        })}
    </Flex>
  );
};
