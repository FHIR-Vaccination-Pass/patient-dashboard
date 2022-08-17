import { immunizationRecommendationApi } from '../core/services/redux/fhir';
import { ImmunizationRecommendationMapper } from '../core/models';

type UseQueryType = typeof immunizationRecommendationApi.endpoints.get.useQuery;
export type UseImmunizationRecommendationsParameters = Parameters<UseQueryType>;
export type UseImmunizationRecommendationsReturnType =
  ReturnType<UseQueryType> & {
    idToImmunizationRecommendation: ReturnType<
      typeof ImmunizationRecommendationMapper.curry
    >;
  };

export const useImmunizationRecommendations = (
  arg: UseImmunizationRecommendationsParameters[0],
  options?: UseImmunizationRecommendationsParameters[1]
): UseImmunizationRecommendationsReturnType => {
  const queryResult = immunizationRecommendationApi.endpoints.get.useQuery(
    arg,
    options
  );
  const idToImmunizationRecommendation = ImmunizationRecommendationMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToImmunizationRecommendation };
};
