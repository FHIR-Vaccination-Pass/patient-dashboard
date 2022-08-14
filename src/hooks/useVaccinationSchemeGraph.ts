import {
  VaccinationDose,
  VaccinationDoseMapper,
  VaccinationScheme,
} from '../core/models';
import { vaccinationDoseApi } from '../core/services/redux/fhir';
import { skipToken } from '@reduxjs/toolkit/query';

export interface VaccinationSchemeGraphNode {
  vaccinationScheme: VaccinationScheme;
  doses: Map<VaccinationDose['id'], VaccinationDose>;
}
export type VaccinationSchemeGraph = Map<
  VaccinationScheme['id'],
  VaccinationSchemeGraphNode
>;

export const useVaccinationSchemeGraph = (
  vaccinationSchemes: VaccinationScheme[] | undefined
): VaccinationSchemeGraph | undefined => {
  const { data: vaccinationDoses } = vaccinationDoseApi.endpoints.get.useQuery(
    vaccinationSchemes ? {} : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data
          ?.map(VaccinationDoseMapper.fromResource)
          .filter((vd) =>
            vaccinationSchemes?.find((vs) => vs.id === vd.vaccinationSchemeId)
          ),
      }),
    }
  );

  if (vaccinationSchemes === undefined || vaccinationDoses === undefined) {
    return undefined;
  }

  const graph = new Map<VaccinationScheme['id'], VaccinationSchemeGraphNode>(
    vaccinationSchemes.map((vaccinationScheme) => [
      vaccinationScheme.id,
      {
        vaccinationScheme,
        doses: new Map<VaccinationDose['id'], VaccinationDose>(),
      },
    ])
  );

  // sort by [vaccinationSchemeId, numberInScheme] so that consumers get doses
  // in the right order
  const sortedVaccinationDoses = Array.from(vaccinationDoses).sort((a, b) => {
    if (a.vaccinationSchemeId !== b.vaccinationSchemeId) {
      if (a.vaccinationSchemeId < b.vaccinationSchemeId) {
        return -1;
      } else {
        return 1;
      }
    }

    // sort repeating dose to the end
    if (!('numberInScheme' in a)) {
      return 1;
    }
    if (!('numberInScheme' in b)) {
      return -1;
    }

    if (a.numberInScheme < b.numberInScheme) {
      return -1;
    }
    if (a.numberInScheme > b.numberInScheme) {
      return 1;
    }
    return 0;
  });
  sortedVaccinationDoses.forEach((vaccinationDose) =>
    graph
      .get(vaccinationDose.vaccinationSchemeId)
      ?.doses.set(vaccinationDose.id, vaccinationDose)
  );

  return graph;
};
