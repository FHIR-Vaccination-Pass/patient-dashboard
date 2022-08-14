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
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { Link, useLocation } from 'react-router-dom';
import { resolvePractitionerName } from '../../core/services/util/resolveHumanName';
import { VaccinationDoseSingle } from '../../core/models/VaccinationDose';

export function PatientHistory() {
  const [color] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['gray.300']
    // a single fallback or fallback array matching the length of the previous arg
  );

  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const patientId: string = pathComponents[pathComponents.length - 2];

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

  const mapper = useMapper();
  //TODO: Query for the actual immunizations of the patient
  return (
    <Box ml={'300px'} w={'70%'} alignItems={'center'}>
      <VerticalTimeline layout={'1-column-left'} lineColor={`${color}`}>
        {mapper.getAllImmunizations().map((immunization) => {
          return mapper
            .getMedicationByVaccineCode(immunization.vaccineCode)
            ?.targetDiseaseIds.map((diseaseId) => (
              <VerticalTimelineElement
                iconStyle={timelineElementIconStyles}
                contentStyle={timelineElementStyles}
                contentArrowStyle={{ display: 'none' }}
              >
                <Link
                  to={
                    `/md/dashboard/patient/${patientId}/record/` +
                    mapper.getDiseaseById(diseaseId)?.code.coding.code
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
                        {mapper.getDiseaseById(diseaseId)?.name}
                      </Text>
                      <Badge
                        w={'50%'}
                        textAlign={'center'}
                        colorScheme='green'
                        variant='subtle'
                      >
                        {immunization.occurrenceTime.toDateString()}
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
                        {
                          mapper.getMedicationByVaccineCode(
                            immunization.vaccineCode
                          )?.tradeName
                        }
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
                        {resolvePractitionerName(
                          mapper.getPractitionerById(immunization.performerId)
                            ?.name
                        )}
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
                        {immunization.lotNumber}
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
                        {
                          (
                            mapper.getVaccinationDoseById(
                              immunization.vaccinationDoseId
                            ) as VaccinationDoseSingle
                          ).numberInScheme
                        }{' '}
                        /{' '}
                        {mapper.getNumberOfDosesByMedicationId(
                          mapper.getMedicationByVaccineCode(
                            immunization.vaccineCode
                          )?.id
                        )}
                      </Badge>
                    </Flex>
                  </Stack>
                </Link>
              </VerticalTimelineElement>
            ));
        })}
      </VerticalTimeline>
    </Box>
  );
}
