import React, { FC } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import {
  useImmunizationRecommendations,
  useImmunizations,
  useMedicationInfo,
  useMedications,
  usePractitioners,
  useTargetDiseases,
} from '../../../hooks';
import { ImmunizationRecommendation } from '../../../core/models';
import { skipToken } from '@reduxjs/toolkit/query';

export const RecentHistoryWidget: FC = ({}) => {
  const params = useParams();
  const patientId = params['patientId'];
  const { data: medicationsData, idToMedication } = useMedications({});

  const { data: immunizations, idToImmunization } = useImmunizations(
    medicationsData
      ? {
          'vaccine-code': medicationsData.ids
            .map(idToMedication)
            .map((m) => m!.code.coding.code)
            .join(','),
        }
      : skipToken
  );
  const { idToTargetDisease } = useTargetDiseases({});

  const {
    vaccinationSchemes,
    idToVaccinationScheme,
    vaccinationDoses,
    idToVaccinationDose,
  } = useMedicationInfo(
    medicationsData?.ids.map((id: string) => idToMedication(id)!)
  );

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
    >
      <Box overflowY={'scroll'}>
        {immunizations ? (
          immunizations.ids.map((iId: string) => {
            const imm = idToImmunization(iId);
            const med =
              imm &&
              idToMedication(
                medicationsData?.byCode[imm.vaccineCode.coding.code]?.ids[0]
              );
            const vs =
              med &&
              idToVaccinationScheme(
                standardVaccinationSchemes?.byMedication[med.id]?.ids[0]
              );
            const allDoses =
              vs &&
              vaccinationDoses?.byVaccinationScheme[vs.id]?.ids.map(
                idToVaccinationDose
              );
            const dose = idToVaccinationDose(imm?.vaccinationDoseId);
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
                  <Text> {med?.tradeName} </Text>
                  <Flex w={'50%'} justifyContent={'end'} alignItems={'center'}>
                    {med && vs && allDoses && dose && (
                      <>
                        <Badge
                          colorScheme={'gray'}
                          variant='solid'
                          w={'100%'}
                          textAlign={'center'}
                          mr={3}
                        >
                          Dose:{' '}
                          {'numberInScheme' in dose!
                            ? `${dose.numberInScheme} / ${allDoses!.length}`
                            : 'Booster'}
                        </Badge>
                        <Badge
                          colorScheme={'blue'}
                          variant='solid'
                          w={'100%'}
                          textAlign={'center'}
                          mr={3}
                        >
                          {imm?.occurrenceTime.toLocaleDateString()}
                        </Badge>
                      </>
                    )}
                  </Flex>
                </Flex>
                <Divider />
              </Stack>
            );
          })
        ) : (
          <> </>
        )}
      </Box>
      <Divider orientation='horizontal' />
      <Flex
        h={'40px'}
        alignItems={'center'}
        bg={'white'}
        textColor={'green.600'}
        cursor={'pointer'}
        borderBottomRadius={'10px'}
        justifyContent={'center'}
        m={1}
      >
        <Link to={`/md/dashboard/patient/${patientId}/history/`}>
          <Text justifyContent={'flex-start'} color={'gray.600'}>
            Open Vaccination History
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};
