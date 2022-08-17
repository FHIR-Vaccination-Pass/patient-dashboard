import { vacationPlanApi } from '../core/services/redux/fhir';
import { VacationPlanMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/vacationPlanApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseVacationPlansReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  vacationPlans?: VacationPlanMapper[];
  idToVacationPlan: (id: string | undefined) => VacationPlanMapper | undefined;
}

export const useVacationPlans = (
  arg: GetArgs | typeof skipToken
): UseVacationPlansReturnType => {
  const { data } = vacationPlanApi.endpoints.get.useQuery(arg);
  const idToVacationPlan = VacationPlanMapper.curry((id) => data?.entities[id]);
  const vacationPlans = data?.ids.map((id: string) => idToVacationPlan(id)!);

  return {
    data,
    vacationPlans,
    idToVacationPlan,
  };
};
