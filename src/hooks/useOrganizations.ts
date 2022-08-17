import { organizationApi } from '../core/services/redux/fhir';
import { OrganizationMapper } from '../core/models';

type UseQueryType = typeof organizationApi.endpoints.get.useQuery;
export type UseOrganizationsParameters = Parameters<UseQueryType>;
export type UseOrganizationsReturnType = ReturnType<UseQueryType> & {
  idToOrganization: ReturnType<typeof OrganizationMapper.curry>;
};

export const useOrganizations = (
  arg: UseOrganizationsParameters[0],
  options?: UseOrganizationsParameters[1]
): UseOrganizationsReturnType => {
  const queryResult = organizationApi.endpoints.get.useQuery(arg, options);
  const idToOrganization = OrganizationMapper.curry(
    (id) => queryResult.data?.entities[id]
  );

  return { ...queryResult, idToOrganization };
};
