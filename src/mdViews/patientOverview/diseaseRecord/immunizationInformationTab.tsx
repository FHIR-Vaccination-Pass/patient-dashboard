import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { DiseaseMapper } from '../../../core/models';
import {
  useImmunizationRecommendations,
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
import { FaFolderOpen } from 'react-icons/fa';

export const ImmunizationInformationTab: FC = ({}) => {
  const params = useParams();
  const patientId = params['patientId']!;
  const diseaseId = params['diseaseCode']!;

  const { data: tdRaw } =
    targetDiseaseApi.endpoints.getById.useQuery(diseaseId);
  const currentDisease = DiseaseMapper.fromResource(tdRaw);

  const {
    idToMedication,
    data: medicationsData,
    medications,
  } = useMedications({});
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

  const { immunizationRecommendations } = useImmunizationRecommendations({
    patient: patientId,
    'target-disease': currentDisease?.code.coding.code,
  });

  let standardMedication = undefined;
  if (immunizations) {
    standardMedication = medications?.find(
      (med) =>
        immunizations.at(0)?.vaccineCode.coding.code === med.code.coding.code
    );
  } else if (immunizationRecommendations) {
    standardMedication = medications?.find(
      (med) =>
        immunizationRecommendations.at(0)?.vaccineCode.coding.code ===
        med.code.coding.code
    );
  }

  const { data: vaccinationDosesData, idToVaccinationDose } =
    useVaccinationDoses({});
  const { idToPractitioner } = usePractitioners({});
  const { idToOrganization } = useOrganizations({});

  // const standardMedication = idToMedication(medicationsForDisease?.ids.at(0));
  const manufacturer = idToOrganization(standardMedication?.manufacturerId);

  return (
    <Flex flexDirection={'column'}>
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
      {(immunizations || immunizationRecommendations) && (
        <Box>
          <HStack spacing={'20px'} w={'100%'} m={'30px 0px 30px 24px'}>
            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Name
              </Text>
              <Text>{standardMedication?.tradeName}</Text>
            </Flex>

            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Manufacturer
              </Text>
              <Text>{manufacturer?.name}</Text>
            </Flex>

            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                PZN Code
              </Text>
              <Text>{standardMedication?.code.coding.code}</Text>
            </Flex>

            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Form
              </Text>
              <Text>{standardMedication?.form.coding.code}</Text>
            </Flex>
          </HStack>
        </Box>
      )}

      {immunizations && (
        <>
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
                    medicationsData?.byCode[
                      immunization.vaccineCode.coding.code
                    ]?.ids[0]
                  );
                  const pract = idToPractitioner(immunization.performerId);
                  const dose = idToVaccinationDose(
                    immunization?.vaccinationDoseId
                  );
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
                          w={'100%'}
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
                          w={'100%'}
                          textAlign={'center'}
                          colorScheme='green'
                          variant='subtle'
                        >
                          {immunization.occurrenceTime.toLocaleDateString()}
                        </Badge>
                      </Td>
                      <Td>{resolvePractitionerName(pract?.name)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
      {(immunizations === undefined || immunizations.length < 1) &&
        (immunizationRecommendations === undefined ||
          immunizationRecommendations.length < 1) && (
          <Stack
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={'10%'}
          >
            <Icon as={FaFolderOpen} color={'gray.200'} w={20} h={20} />
            <Box p='3'>
              <Text color={'gray.400'}>
                No personalized vaccine information available
              </Text>
            </Box>
          </Stack>
        )}
    </Flex>
  );
};
