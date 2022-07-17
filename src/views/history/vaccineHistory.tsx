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
import { useMapper } from '../../core/services/server/ResourceMapperContext';
import { Link } from 'react-router-dom';
import { VaccinationDoseSingle } from '../../core/models/VaccinationDose';

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

  const mapper = useMapper();
  return (
    <Box overflow={'hidden'} h={'full'}>
      <VerticalTimeline lineColor={`${color}`}>
        {mapper.getImmunizations().map((immunization) => {
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
                    '/dashboard/wiki/' +
                    mapper.getDiseaseById(diseaseId)?.code.text
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
                        {
                          mapper.getPractitionerById(immunization.performerId)
                            ?.name.family
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
                        {
                          mapper.getVaccinationDoseById(
                            immunization.vaccinationDoseId
                          )?.doseQuantity
                        }
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
