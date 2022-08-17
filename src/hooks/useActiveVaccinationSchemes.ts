import { activeVaccinationSchemeApi } from '../core/services/redux/fhir';
import { ActiveVaccinationSchemeMapper } from '../core/models';

type UseQueryType = typeof activeVaccinationSchemeApi.endpoints.get.useQuery;
export type UseActiveVaccinationSchemesParameters = Parameters<UseQueryType>;
export type UseActiveVaccinationSchemesReturnType = ReturnType<UseQueryType> & {
  idToActiveVaccinationScheme: ReturnType<
    typeof ActiveVaccinationSchemeMapper.curry
  >;
};

export const useActiveVaccinationSchemes = (
  arg: UseActiveVaccinationSchemesParameters[0],
  options?: UseActiveVaccinationSchemesParameters[1]
): UseActiveVaccinationSchemesReturnType => {
  const queryResult = activeVaccinationSchemeApi.endpoints.get.useQuery(
    arg,
    options
  );
  const idToActiveVaccinationScheme = ActiveVaccinationSchemeMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToActiveVaccinationScheme };
};
