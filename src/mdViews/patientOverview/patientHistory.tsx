import {
  Badge,
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  useToken,
} from '@chakra-ui/react';
import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { Link, useParams } from 'react-router-dom';
import { resolvePractitionerName } from '../../core/services/util/resolveHumanName';
import {
  useImmunizations,
  useMedicationInfo,
  useMedications,
  usePractitioners,
  useTargetDiseases,
} from '../../hooks';
import { skipToken } from '@reduxjs/toolkit/query';

export function PatientHistory() {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['gray.300']
    // a single fallback or fallback array matching the length of the previous arg
  );

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
          patient: patientId,
        }
      : skipToken
  );
  const { idToTargetDisease, data: targetDiseases } = useTargetDiseases({});

  const { idToPractitioner } = usePractitioners({});

  const {
    vaccinationSchemes,
    idToVaccinationScheme,
    vaccinationDoses,
    idToVaccinationDose,
  } = useMedicationInfo(
    medicationsData?.ids.map((id: string) => idToMedication(id)!)
  );

  const standardVaccinationSchemes = vaccinationSchemes?.byType['standard'];

  const timelineElementStyles: React.CSSProperties = {
    boxShadow: `0 0px 0px 2.5px ${color}`,
    borderRadius: '20px',
    marginLeft: '50px',
    padding: '15px 0px 0px 0px',
  };

  const timelineElementIconStyles: React.CSSProperties = {
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    boxShadow: `0 0px 0px 6px ${color}`,
    left: '15px',
    top: '90px',
  };

  const headline: React.CSSProperties = {
    fontSize: '12pt',
  };

  const label: React.CSSProperties = {
    fontSize: '11pt',
  };

  return (
    <Box ml={'100px'} w={'70%'} alignItems={'center'}>
      <VerticalTimeline layout={'1-column-left'} lineColor={`${color}`}>
        {immunizations ? (
          immunizations.ids
            .slice()
            .sort(
              (a, b) =>
                (idToImmunization(b)?.occurrenceTime?.getTime()?.valueOf() ??
                  0) -
                (idToImmunization(a)?.occurrenceTime?.getTime()?.valueOf() ?? 0)
            )
            .map((iId: string) => {
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
              const prac = idToPractitioner(imm?.performerId);
              const allDoses =
                vs &&
                vaccinationDoses?.byVaccinationScheme[vs.id]?.ids.map(
                  idToVaccinationDose
                );
              const dose = idToVaccinationDose(imm?.vaccinationDoseId);

              return med?.targetDiseaseIds.map((diseaseId) => {
                return (
                  <VerticalTimelineElement
                    key={`${iId}/${diseaseId}`}
                    iconStyle={timelineElementIconStyles}
                    contentStyle={timelineElementStyles}
                    contentArrowStyle={{ display: 'none' }}
                  >
                    <Link
                      to={
                        `/md/dashboard/patient/${patientId}/record/` +
                        idToTargetDisease(
                          targetDiseases?.byCode[diseaseId]?.ids.slice().pop()
                        )?.code.coding.code
                      }
                    >
                      <Stack>
                        <Flex
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          pl={'16px'}
                          pr={'16px'}
                        >
                          <Text style={headline} m={'0px !important'}>
                            {
                              idToTargetDisease(
                                targetDiseases?.byCode[diseaseId]?.ids
                                  .slice()
                                  .pop()
                              )?.name
                            }
                          </Text>
                          <Badge
                            w={'50%'}
                            textAlign={'center'}
                            colorScheme='green'
                            variant='subtle'
                          >
                            {imm?.occurrenceTime.toLocaleDateString()}
                          </Badge>
                        </Flex>
                        <Divider></Divider>
                        <Flex
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          pl={'16px'}
                          pr={'16px'}
                        >
                          <Text
                            style={label}
                            color={'gray.600'}
                            m={'0px !important'}
                          >
                            Vaccine Name:
                          </Text>
                          <Badge
                            w={'50%'}
                            textAlign={'center'}
                            colorScheme='purple'
                            variant='subtle'
                          >
                            {med?.tradeName}
                          </Badge>
                        </Flex>
                        <Flex
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          pl={'16px'}
                          pr={'16px'}
                        >
                          <Text
                            style={label}
                            color={'gray.600'}
                            m={'0px !important'}
                          >
                            Medical Doctor:
                          </Text>
                          <Badge
                            w={'50%'}
                            textAlign={'center'}
                            colorScheme='purple'
                            variant='subtle'
                          >
                            {resolvePractitionerName(prac?.name)}
                          </Badge>
                        </Flex>
                        <Flex
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          pl={'16px'}
                          pr={'16px'}
                        >
                          <Text
                            style={label}
                            color={'gray.600'}
                            m={'0px !important'}
                          >
                            Lot number:
                          </Text>
                          <Badge
                            w={'50%'}
                            textAlign={'center'}
                            colorScheme='purple'
                            variant='subtle'
                          >
                            {imm?.lotNumber}
                          </Badge>
                        </Flex>
                        <Flex
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          pl={'16px'}
                          pr={'16px'}
                        >
                          <Text
                            style={label}
                            color={'gray.600'}
                            m={'0px !important'}
                          >
                            Dose:
                          </Text>
                          {med && vs && allDoses && dose && (
                            <Badge
                              w={'50%'}
                              textAlign={'center'}
                              colorScheme='orange'
                              variant='subtle'
                            >
                              {'numberInScheme' in dose!
                                ? `${dose.numberInScheme} / ${allDoses!.length}`
                                : 'Booster'}
                            </Badge>
                          )}
                        </Flex>
                      </Stack>
                    </Link>
                  </VerticalTimelineElement>
                );
              });
            })
        ) : (
          <></>
        )}
      </VerticalTimeline>
    </Box>
  );
}
