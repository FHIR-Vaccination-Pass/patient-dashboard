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
import { mockImmunizations } from '../../core/mockData/mockImmunizations';
import { Link } from 'react-router-dom';

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

  return (
    <Box overflow={'hidden'}>
      <VerticalTimeline lineColor={`${color}`}>
        {mockImmunizations.map((vaccination) => (
          <VerticalTimelineElement
            iconStyle={timelineElementIconStyles}
            contentStyle={timelineElementStyles}
            contentArrowStyle={{ display: 'none' }}
          >
            <Link to={'/dashboard/wiki/' + vaccination.}>
              <Stack>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pl={'16px'}
                  pr={'16px'}
                >
                  <Text style={headline} m={'0px !important'}>
                    {vaccination.diseaseName}
                  </Text>
                  <Badge
                    w={'50%'}
                    textAlign={'center'}
                    colorScheme='green'
                    variant='subtle'
                  >
                    {vaccination.date}
                  </Badge>
                </Flex>
                <Divider></Divider>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pl={'16px'}
                  pr={'16px'}
                >
                  <Text style={label} color={'gray.600'} m={'0px !important'}>
                    Vaccine Name:
                  </Text>
                  <Badge
                    w={'50%'}
                    textAlign={'center'}
                    colorScheme='purple'
                    variant='subtle'
                  >
                    {vaccination.vaccineName}
                  </Badge>
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pl={'16px'}
                  pr={'16px'}
                >
                  <Text style={label} color={'gray.600'} m={'0px !important'}>
                    Medical Doctor:
                  </Text>
                  <Badge
                    w={'50%'}
                    textAlign={'center'}
                    colorScheme='purple'
                    variant='subtle'
                  >
                    {vaccination.medicalDoctor}
                  </Badge>
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pl={'16px'}
                  pr={'16px'}
                >
                  <Text style={label} color={'gray.600'} m={'0px !important'}>
                    Lot number:
                  </Text>
                  <Badge
                    w={'50%'}
                    textAlign={'center'}
                    colorScheme='purple'
                    variant='subtle'
                  >
                    {vaccination.lotNumber}
                  </Badge>
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pl={'16px'}
                  pr={'16px'}
                >
                  <Text style={label} color={'gray.600'} m={'0px !important'}>
                    Dose:
                  </Text>
                  <Badge
                    w={'50%'}
                    textAlign={'center'}
                    colorScheme='orange'
                    variant='subtle'
                  >
                    {vaccination.dose}
                  </Badge>
                </Flex>
              </Stack>
            </Link>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Box>
  );
}
