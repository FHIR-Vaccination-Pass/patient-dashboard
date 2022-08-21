import {
  Badge,
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  useToken,
} from '@chakra-ui/react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { resolvePractitionerName } from '../../core/services/util/resolveHumanName';
import {
  useImmunizations,
  useMedications,
  usePractitioners,
  useTargetDiseases,
  useVaccinationDoses,
} from '../../hooks';
import { skipToken } from '@reduxjs/toolkit/query';

export function VaccineHistory() {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['gray.300']
    // a single fallback or fallback array matching the length of the previous arg
  );

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

  const { immunizations } = useImmunizations({});
  const { data: medicationsData, idToMedication } = useMedications(
    immunizations
      ? {
          code: immunizations
            .map((imm) => imm.vaccineCode.coding.code)
            .join(','),
        }
      : skipToken
  );
  const { data: vaccinationDosesData, idToVaccinationDose } =
    useVaccinationDoses({});
  const { data: targetDiseaseData, idToTargetDisease } = useTargetDiseases({});
  const { idToPractitioner } = usePractitioners({});

  return (
    <Box h={'full'}>
      {immunizations && (
        <VerticalTimeline lineColor={`${color}`}>
          {immunizations.map((imm) => {
            const med = idToMedication(
              medicationsData?.byCode[imm.vaccineCode.coding.code]?.ids[0]
            );
            const pract = idToPractitioner(imm.performerId);
            const dose = idToVaccinationDose(imm?.vaccinationDoseId);
            const numberOfDoses =
              dose &&
              vaccinationDosesData?.byVaccinationScheme[
                dose.vaccinationSchemeId
              ]?.ids.length;

            return med?.targetDiseaseCodes.map((diseaseId) => {
              const targetDisease = idToTargetDisease(
                targetDiseaseData?.byCode[diseaseId]?.ids[0]
              );

              return (
                <VerticalTimelineElement
                  key={`${imm.id}/${diseaseId}`}
                  iconStyle={timelineElementIconStyles}
                  contentStyle={timelineElementStyles}
                  contentArrowStyle={{ display: 'none' }}
                >
                  <Link
                    to={
                      '/patient/dashboard/wiki/' +
                      targetDisease?.code.coding.code
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
                          {targetDisease?.name}
                        </Text>
                        <Badge
                          w={'50%'}
                          textAlign={'center'}
                          colorScheme='green'
                          variant='subtle'
                        >
                          {imm.occurrenceTime.toDateString()}
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
                          {med.tradeName}
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
                          {resolvePractitionerName(pract?.name)}
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
                          {imm.lotNumber}
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
                        <Badge
                          w={'50%'}
                          textAlign={'center'}
                          colorScheme='orange'
                          variant='subtle'
                        >
                          {dose && 'numberInScheme' in dose
                            ? `${dose.numberInScheme} / ${numberOfDoses}`
                            : 'Booster'}
                        </Badge>
                      </Flex>
                    </Stack>
                  </Link>
                </VerticalTimelineElement>
              );
            });
          })}
        </VerticalTimeline>
      )}
    </Box>
  );
}
