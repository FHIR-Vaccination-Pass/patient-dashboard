import {
  Badge,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { ImmunizationRecommendation } from '../../core/models/ImmunizationRecommendation';
import { Patient, PatientMapper } from '../../core/models/Patient';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { AggregatedImmunizationStatus } from '../../core/models/AggregatedImmunizationStatus';
import { calcAggregateImmunizationStatus } from '../../components/dashboard/immunizationStatus/immunizationStatusCard';
import { ResourceMapper } from '../../core/services/resourceMapper/ResourceMapper';
import { Link } from 'react-router-dom';
import { patientApi } from '../../core/services/redux/fhir';

function calculateStatusForAllPatients(
  patientIds: string[],
  mapper: ResourceMapper
): any {
  const recommendations: ImmunizationRecommendation[] =
    mapper.getAllRecommendations();
  let statusMap = new Map<string, AggregatedImmunizationStatus>();

  patientIds.forEach((patientId) => {
    const patientRecommendations = recommendations.filter(
      (recommendation: ImmunizationRecommendation) => {
        return recommendation.patientId === patientId;
      }
    );
    statusMap.set(
      patientId,
      calcAggregateImmunizationStatus(patientRecommendations)
    );
  });
  return statusMap;
}

export function MDOverview() {
  const mapper = useMapper();
  const { data: patients } = patientApi.endpoints.get.useQuery({});

  if (patients === undefined) {
    return <></>;
  }
  const usersMapped = patients.ids.map((irId) =>
    PatientMapper.fromResource(patients!.entities[irId])
  );

  const patientStatusMap: Map<string, AggregatedImmunizationStatus> =
    calculateStatusForAllPatients(
      usersMapped.map((patient: PatientMapper) => patient.id),
      mapper
    );
  return (
    <Box>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Birthday</Th>
              <Th>Status</Th>
              <Th>Tag</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersMapped.map((patient: Patient) => (
              <Tr>
                <Td>
                  <Link to={`patient/${patient.id}`}>
                    {patient.name.given.join(' ') + ' ' + patient.name.family}
                  </Link>
                </Td>
                <Td>{patient.birthDate.toLocaleDateString()}</Td>
                <Td>
                  <Badge
                    backgroundColor={
                      patientStatusMap.get(patient.id)?.backgroundColor
                    }
                  >
                    {patientStatusMap.get(patient.id)?.status}
                  </Badge>
                </Td>
                <Td>
                  <Badge>Tag</Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
