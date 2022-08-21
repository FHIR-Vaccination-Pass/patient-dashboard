import { organizationApi } from '../core/services/redux/fhir';
import { OrganizationMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/organizationApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseOrganizationsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  organizations?: OrganizationMapper[];
  idToOrganization: (id: string | undefined) => OrganizationMapper | undefined;
}

export const useOrganizations = (
  arg: GetArgs | typeof skipToken
): UseOrganizationsReturnType => {
  const { data, isFetching } = organizationApi.endpoints.get.useQuery(arg);
  const idToOrganization = OrganizationMapper.curry((id) => data?.entities[id]);
  const organizations = data?.ids.map((id: string) => idToOrganization(id)!);

  return {
    data,
    isFetching,
    organizations,
    idToOrganization,
  };
};
