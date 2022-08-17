import { populationRecommendationApi } from '../core/services/redux/fhir';
import { PopulationRecommendationMapper } from '../core/models';

type UseQueryType = typeof populationRecommendationApi.endpoints.get.useQuery;
export type UsePopulationRecommendationsParameters = Parameters<UseQueryType>;
export type UsePopulationRecommendationsReturnType =
  ReturnType<UseQueryType> & {
    idToPopulationRecommendation: ReturnType<
      typeof PopulationRecommendationMapper.curry
    >;
  };

export const usePopulationRecommendations = (
  arg: UsePopulationRecommendationsParameters[0],
  options?: UsePopulationRecommendationsParameters[1]
): UsePopulationRecommendationsReturnType => {
  const queryResult = populationRecommendationApi.endpoints.get.useQuery(
    arg,
    options
  );
  const idToPopulationRecommendation = PopulationRecommendationMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToPopulationRecommendation };
};
