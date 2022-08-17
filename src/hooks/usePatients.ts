import { patientApi } from '../core/services/redux/fhir';
import { PatientMapper } from '../core/models';

type UseQueryType = typeof patientApi.endpoints.get.useQuery;
export type UsePatientsParameters = Parameters<UseQueryType>;
export type UsePatientsReturnType = ReturnType<UseQueryType> & {
  idToPatient: ReturnType<typeof PatientMapper.curry>;
};

export const usePatients = (
  arg: UsePatientsParameters[0],
  options?: UsePatientsParameters[1]
): UsePatientsReturnType => {
  const queryResult = patientApi.endpoints.get.useQuery(arg, options);
  const idToPatient = PatientMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToPatient };
};
