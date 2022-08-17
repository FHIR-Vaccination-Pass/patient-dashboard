import { practitionerApi } from '../core/services/redux/fhir';
import { PractitionerMapper } from '../core/models';

type UseQueryType = typeof practitionerApi.endpoints.get.useQuery;
export type UsePractitionersParameters = Parameters<UseQueryType>;
export type UsePractitionersReturnType = ReturnType<UseQueryType> & {
  idToPractitioner: ReturnType<typeof PractitionerMapper.curry>;
};

export const usePractitioners = (
  arg: UsePractitionersParameters[0],
  options?: UsePractitionersParameters[1]
): UsePractitionersReturnType => {
  const queryResult = practitionerApi.endpoints.get.useQuery(arg, options);
  const idToPractitioner = PractitionerMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToPractitioner };
};
