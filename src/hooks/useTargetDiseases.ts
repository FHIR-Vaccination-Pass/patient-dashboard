import { targetDiseaseApi } from '../core/services/redux/fhir';
import { DiseaseMapper } from '../core/models';

type UseQueryType = typeof targetDiseaseApi.endpoints.get.useQuery;
export type UseTargetDiseasesParameters = Parameters<UseQueryType>;
export type UseTargetDiseasesReturnType = ReturnType<UseQueryType> & {
  idToTargetDisease: ReturnType<typeof DiseaseMapper.curry>;
};

export const useTargetDiseases = (
  arg: UseTargetDiseasesParameters[0],
  options?: UseTargetDiseasesParameters[1]
): UseTargetDiseasesReturnType => {
  const queryResult = targetDiseaseApi.endpoints.get.useQuery(arg, options);
  const idToTargetDisease = DiseaseMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToTargetDisease };
};
