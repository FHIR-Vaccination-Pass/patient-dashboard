import React, { FC } from 'react';
import { Badge, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import {
  Immunization,
  Medication,
  Organization,
  Practitioner,
  VaccinationDoseRepeating,
  VaccinationDoseSingle,
} from '../../../core/models';
import { resolvePractitionerName } from '../../../core/services/util/resolveHumanName';

export interface ImmunizationCardProps {
  immunization: Immunization;
  medication: Medication;
  organization: Organization;
  practitioner: Practitioner;
  numberOfDoses: number;
  vaccinationDose: VaccinationDoseSingle | VaccinationDoseRepeating;
}
export const ImmunizationCard: FC<ImmunizationCardProps> = ({
  immunization,
  medication,
  organization,
  practitioner,
  numberOfDoses,
  vaccinationDose,
}) => (
  <Stack
    m={'0px 20px 5px 20px'}
    bg={'gray.100'}
    boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
    borderRadius={'5px'}
    overflow={'hidden'}
  >
    <Grid
      templateColumns='1fr 1fr'
      templateRows='1fr 1fr 1fr'
      rowGap={'5px'}
      columnGap={'10px'}
      p={'5px'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <GridItem>
        <Text w={'1fr'}>{medication.tradeName}</Text>
      </GridItem>
      <GridItem w={'1fr'}>
        <Badge
          colorScheme={'green'}
          variant='subtle'
          w={'100%'}
          textAlign={'center'}
        >
          {immunization.occurrenceTime.toDateString()}
        </Badge>
      </GridItem>
      <GridItem w={'1fr'}>
        <Badge
          colorScheme={'blue'}
          variant='subtle'
          w={'100%'}
          textAlign={'center'}
        >
          {organization.name}
        </Badge>
      </GridItem>
      <GridItem w={'1fr'}>
        <Badge
          colorScheme={'gray'}
          variant='solid'
          w={'100%'}
          textAlign={'center'}
        >
          Dose:{' '}
          {'numberInScheme' in vaccinationDose
            ? `${vaccinationDose.numberInScheme} / ${numberOfDoses}`
            : 'Booster'}
        </Badge>
      </GridItem>
      <GridItem w={'1fr'}>
        <Badge
          colorScheme={'purple'}
          variant='subtle'
          w={'100%'}
          textAlign={'center'}
        >
          {resolvePractitionerName(practitioner.name)}
        </Badge>
      </GridItem>
      <GridItem w={'1fr'}>
        <Badge
          colorScheme={'blue'}
          variant='subtle'
          w={'100%'}
          textAlign={'center'}
        >
          {immunization.lotNumber}
        </Badge>
      </GridItem>
    </Grid>
  </Stack>
);
