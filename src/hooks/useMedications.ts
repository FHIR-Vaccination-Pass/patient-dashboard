import { medicationApi } from '../core/services/redux/fhir';
import { MedicationMapper } from '../core/models';

type UseQueryType = typeof medicationApi.endpoints.get.useQuery;
export type UseMedicationsParameters = Parameters<UseQueryType>;
export type UseMedicationsReturnType = ReturnType<UseQueryType> & {
  idToMedication: ReturnType<typeof MedicationMapper.curry>;
};

export const useMedications = (
  arg: UseMedicationsParameters[0],
  options?: UseMedicationsParameters[1]
): UseMedicationsReturnType => {
  const queryResult = medicationApi.endpoints.get.useQuery(arg, options);
  const idToMedication = MedicationMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToMedication };
};
