import { vacationPlanApi } from '../core/services/redux/fhir';
import { VacationPlanMapper } from '../core/models';

type UseQueryType = typeof vacationPlanApi.endpoints.get.useQuery;
export type UseVacationPlansParameters = Parameters<UseQueryType>;
export type UseVacationPlansReturnType = ReturnType<UseQueryType> & {
  idToVacationPlan: ReturnType<typeof VacationPlanMapper.curry>;
};

export const useVacationPlans = (
  arg: UseVacationPlansParameters[0],
  options?: UseVacationPlansParameters[1]
): UseVacationPlansReturnType => {
  const queryResult = vacationPlanApi.endpoints.get.useQuery(arg, options);
  const idToVacationPlan = VacationPlanMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToVacationPlan };
};
