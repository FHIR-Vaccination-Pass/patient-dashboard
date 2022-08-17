import { immunizationApi } from '../core/services/redux/fhir';
import { ImmunizationMapper } from '../core/models';

type UseQueryType = typeof immunizationApi.endpoints.get.useQuery;
export type UseImmunizationsParameters = Parameters<UseQueryType>;
export type UseImmunizationsReturnType = ReturnType<UseQueryType> & {
  idToImmunization: ReturnType<typeof ImmunizationMapper.curry>;
};

export const useImmunizations = (
  arg: UseImmunizationsParameters[0],
  options?: UseImmunizationsParameters[1]
): UseImmunizationsReturnType => {
  const queryResult = immunizationApi.endpoints.get.useQuery(arg, options);
  const idToImmunization = ImmunizationMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToImmunization };
};
