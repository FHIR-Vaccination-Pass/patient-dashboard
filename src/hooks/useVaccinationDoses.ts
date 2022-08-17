import { vaccinationDoseApi } from '../core/services/redux/fhir';
import { VaccinationDoseMapper } from '../core/models';

type UseQueryType = typeof vaccinationDoseApi.endpoints.get.useQuery;
export type UseVaccinationDosesParameters = Parameters<UseQueryType>;
export type UseVaccinationDosesReturnType = ReturnType<UseQueryType> & {
  idToVaccinationDose: ReturnType<typeof VaccinationDoseMapper.curry>;
};

export const useVaccinationDoses = (
  arg: UseVaccinationDosesParameters[0],
  options?: UseVaccinationDosesParameters[1]
): UseVaccinationDosesReturnType => {
  const queryResult = vaccinationDoseApi.endpoints.get.useQuery(arg, options);
  const idToVaccinationDose = VaccinationDoseMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToVaccinationDose };
};
