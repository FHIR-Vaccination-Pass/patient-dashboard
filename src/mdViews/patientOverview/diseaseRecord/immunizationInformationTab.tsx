import {
  BoxProps,
  Flex,
  Text,
  Box,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Badge,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { DiseaseMapper } from '../../../core/models';
import {
  useImmunizations,
  useMedications,
  useOrganizations,
  usePractitioners,
  useVaccinationDoses,
} from '../../../hooks';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { resolvePractitionerName } from '../../../core/services/util/resolveHumanName';
import { targetDiseaseApi } from '../../../core/services/redux/fhir';

interface ImmunizationInformationTabProps extends BoxProps {
  diseaseId: string;
}

export const ImmunizationInformationTab: FC<
  ImmunizationInformationTabProps
> = ({ diseaseId }) => {
  const params = useParams();
  const patientId = params['patientId']!;

  const { data: tdRaw } =
    targetDiseaseApi.endpoints.getById.useQuery(diseaseId);
  const currentDisease = DiseaseMapper.fromResource(tdRaw);

  const { idToMedication, data: medicationsData } = useMedications({});
  const medicationsForDisease =
    medicationsData?.byTargetDisease[currentDisease?.code.coding.code || ''];
  const { immunizations } = useImmunizations(
    medicationsForDisease
      ? {
          patient: patientId,
          'vaccine-code': medicationsForDisease.ids
            .map(idToMedication)
            .map((m) => m!.code.coding.code)
            .join(','),
        }
      : skipToken
  );

  const { data: vaccinationDosesData, idToVaccinationDose } =
    useVaccinationDoses({});
  const { idToPractitioner } = usePractitioners({});
  const { idToOrganization } = useOrganizations({});

  return (
    <Flex w={'100%'} flexDirection={'column'}>
      <Box
        w={'100%'}
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        m={'0px 10px 0px 0px'}
      >
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Recommended Vaccine
        </Text>
      </Box>
      <HStack mb={'30px'} spacing={'20px'} w={'100%'} mt={'30px'}>
        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Manufacturer
          </Text>
          <Text>Best Manufacturer EUW</Text>
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            PZN Code
          </Text>
          <Text>code.coding.code</Text>
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Form
          </Text>
          <Text>form.coding.code</Text>
        </Flex>
      </HStack>

      <Box
        w={'100%'}
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        m={'0px 10px 0px 0px'}
      >
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Vaccine History
        </Text>
      </Box>
      <TableContainer mt={'30px'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Vaccine Trade Name</Th>
              <Th>Lot Number</Th>
              <Th>Dose</Th>
              <Th>Date</Th>
              <Th>Medical Doctor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {immunizations?.map((immunization) => {
              const med = idToMedication(
                medicationsData?.byCode[immunization.vaccineCode.coding.code]
                  ?.ids[0]
              );
              const pract = idToPractitioner(immunization.performerId);
              const dose = idToVaccinationDose(immunization?.vaccinationDoseId);
              const numberOfDoses =
                dose &&
                vaccinationDosesData?.byVaccinationScheme[
                  dose.vaccinationSchemeId
                ]?.ids.length;
              const manufacturer = idToOrganization(med?.manufacturerId);
              return (
                <Tr key={immunization.id}>
                  <Td>
                    <Text size={'md'}>{med?.tradeName}</Text>{' '}
                    <Text color={'gray.500'} size={'xs'}>
                      {manufacturer?.name}
                    </Text>
                  </Td>
                  <Td>{immunization.lotNumber}</Td>
                  <Td>
                    <Badge
                      w={'75%'}
                      textAlign={'center'}
                      colorScheme='orange'
                      variant='subtle'
                    >
                      {dose && 'numberInScheme' in dose
                        ? `${dose.numberInScheme} / ${numberOfDoses}`
                        : 'Booster'}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      w={'75%'}
                      textAlign={'center'}
                      colorScheme='green'
                      variant='subtle'
                    >
                      {immunization.occurrenceTime.toDateString()}
                    </Badge>
                  </Td>
                  <Td>{resolvePractitionerName(pract?.name)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
