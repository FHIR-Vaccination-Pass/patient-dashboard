import { vaccinationSchemeApi } from '../core/services/redux/fhir';
import { VaccinationSchemeMapper } from '../core/models';

type UseQueryType = typeof vaccinationSchemeApi.endpoints.get.useQuery;
export type UseVaccinationSchemesParameters = Parameters<UseQueryType>;
export type UseVaccinationSchemesReturnType = ReturnType<UseQueryType> & {
  idToVaccinationScheme: ReturnType<typeof VaccinationSchemeMapper.curry>;
};

export const useVaccinationSchemes = (
  arg: UseVaccinationSchemesParameters[0],
  options?: UseVaccinationSchemesParameters[1]
): UseVaccinationSchemesReturnType => {
  const queryResult = vaccinationSchemeApi.endpoints.get.useQuery(arg, options);
  const idToVaccinationScheme = VaccinationSchemeMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToVaccinationScheme };
};
