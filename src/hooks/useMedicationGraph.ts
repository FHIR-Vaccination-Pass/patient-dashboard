import {
  Medication,
  Organization,
  OrganizationMapper,
  VaccinationScheme,
  VaccinationSchemeMapper,
} from '../core/models';
import {
  organizationApi,
  vaccinationSchemeApi,
} from '../core/services/redux/fhir';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useVaccinationSchemeGraph,
  VaccinationSchemeGraph,
  VaccinationSchemeGraphNode,
} from './useVaccinationSchemeGraph';

export interface MedicationGraphNode {
  medication: Medication;
  organization?: Organization;
  schemes: VaccinationSchemeGraph;
}
export type MedicationGraph = Map<Medication['id'], MedicationGraphNode>;

export const useMedicationGraph = (
  medications: Medication[] | undefined
): MedicationGraph | undefined => {
  const { data: organizations } = organizationApi.endpoints.get.useQuery(
    medications
      ? {
          _id: medications
            .map((medication) => medication.manufacturerId)
            .join(','),
        }
      : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map(OrganizationMapper.fromResource),
      }),
    }
  );

  const { data: vaccinationSchemes } =
    vaccinationSchemeApi.endpoints.get.useQuery(medications ? {} : skipToken, {
      selectFromResult: (result) => ({
        ...result,
        data: result.data
          ?.map(VaccinationSchemeMapper.fromResource)
          .filter((vs) => medications?.find((m) => m.id === vs.medicationId)),
      }),
    });

  const vaccinationSchemeGraph = useVaccinationSchemeGraph(vaccinationSchemes);

  if (
    medications === undefined ||
    organizations === undefined ||
    vaccinationSchemeGraph === undefined
  ) {
    return undefined;
  }

  const organizationIdToOrganization = new Map<
    Organization['id'],
    Organization
  >(organizations.map((organization) => [organization.id, organization]));

  const graph = new Map<Medication['id'], MedicationGraphNode>(
    medications.map((medication) => [
      medication.id,
      {
        medication,
        organization: organizationIdToOrganization.get(
          medication.manufacturerId
        ),
        schemes: new Map<VaccinationScheme['id'], VaccinationSchemeGraphNode>(),
      },
    ])
  );

  for (const { vaccinationScheme, doses } of vaccinationSchemeGraph.values()) {
    graph
      .get(vaccinationScheme.medicationId)
      ?.schemes.set(vaccinationScheme.id, { vaccinationScheme, doses });
  }

  return graph;
};
