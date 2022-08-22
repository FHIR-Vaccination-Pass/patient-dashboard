import { immunizationRecommendationApi } from '../core/services/redux/fhir';
import { ImmunizationRecommendationMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/immunizationRecommendationApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseImmunizationRecommendationsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  immunizationRecommendations?: ImmunizationRecommendationMapper[];
  idToImmunizationRecommendation: (
    id: string | undefined
  ) => ImmunizationRecommendationMapper | undefined;
}

export const useImmunizationRecommendations = (
  arg: GetArgs | typeof skipToken
): UseImmunizationRecommendationsReturnType => {
  const { data, isFetching } =
    immunizationRecommendationApi.endpoints.get.useQuery(arg);
  const idToImmunizationRecommendation = ImmunizationRecommendationMapper.curry(
    (id) => data?.entities[id]
  );
  const immunizationRecommendations = data?.ids.map(
    (id: string) => idToImmunizationRecommendation(id)!
  );

  return {
    data,
    isFetching,
    immunizationRecommendations,
    idToImmunizationRecommendation,
  };
};
