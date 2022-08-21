import { populationRecommendationApi } from '../core/services/redux/fhir';
import { PopulationRecommendationMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/populationRecommendationApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UsePopulationRecommendationsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  populationRecommendations?: PopulationRecommendationMapper[];
  idToPopulationRecommendation: (
    id: string | undefined
  ) => PopulationRecommendationMapper | undefined;
}

export const usePopulationRecommendations = (
  arg: GetArgs | typeof skipToken
): UsePopulationRecommendationsReturnType => {
  const { data, isFetching } =
    populationRecommendationApi.endpoints.get.useQuery(arg);
  const idToPopulationRecommendation = PopulationRecommendationMapper.curry(
    (id) => data?.entities[id]
  );
  const populationRecommendations = data?.ids.map(
    (id: string) => idToPopulationRecommendation(id)!
  );

  return {
    data,
    isFetching,
    populationRecommendations,
    idToPopulationRecommendation,
  };
};
