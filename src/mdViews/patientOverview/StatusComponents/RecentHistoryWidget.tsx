import React, { FC } from 'react';
import { Badge, Box, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import {
  useImmunizations,
  useMedicationInfo,
  useMedications,
} from '../../../hooks';
import { skipToken } from '@reduxjs/toolkit/query';

export const RecentHistoryWidget: FC = () => {
  const params = useParams();
  const patientId = params['patientId'];

  const { immunizations } = useImmunizations({
    patient: patientId,
  });
  const {
    data: medicationsData,
    medications,
    idToMedication,
  } = useMedications(
    immunizations
      ? {
          code: immunizations
            .map((imm) => imm.vaccineCode.coding.code)
            .join(','),
        }
      : skipToken
  );
  const { vaccinationDoses, idToVaccinationDose } =
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
    >
      <Box overflowY={'scroll'}>
        {immunizations
          ?.slice()
          .sort(
            (a, b) =>
              (b.occurrenceTime?.getTime()?.valueOf() ?? 0) -
              (a.occurrenceTime?.getTime()?.valueOf() ?? 0)
          )
          .map((imm) => {
            const med =
              imm &&
              idToMedication(
                medicationsData?.byCode[imm.vaccineCode.coding.code]?.ids[0]
              );
            const dose = idToVaccinationDose(imm?.vaccinationDoseId);
            const allDoses =
              dose &&
              vaccinationDoses?.byVaccinationScheme[
                dose.vaccinationSchemeId
              ]?.ids.map(idToVaccinationDose);

            return (
              <Stack key={imm.id}>
                <Flex
                  justifyContent={'space-between'}
                  w={'100%'}
                  alignItems={'center'}
                  p={4}
                  pl={6}
                  pr={6}
                >
                  <Text w={'10vw'}> {med?.tradeName} </Text>
                  <Divider orientation={'vertical'} h={'40px'} />
                  <Flex w={'50%'} justifyContent={'end'} alignItems={'center'}>
                    {med && allDoses && dose && (
                      <>
                        <Badge
                          colorScheme={'orange'}
                          variant='subtle'
                          w={'200px'}
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
                          variant='subtle'
                          w={'100px'}
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
          })}
      </Box>
      <Box>
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
      </Box>
    </Flex>
  );
};
