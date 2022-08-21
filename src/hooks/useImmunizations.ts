import { immunizationApi } from '../core/services/redux/fhir';
import { ImmunizationMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/immunizationApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseImmunizationsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  immunizations?: ImmunizationMapper[];
  idToImmunization: (id: string | undefined) => ImmunizationMapper | undefined;
}

export const useImmunizations = (
  arg: GetArgs | typeof skipToken
): UseImmunizationsReturnType => {
  const { data, isFetching } = immunizationApi.endpoints.get.useQuery(arg);
  const idToImmunization = ImmunizationMapper.curry((id) => data?.entities[id]);
  const immunizations = data?.ids.map((id: string) => idToImmunization(id)!);

  return {
    data,
    isFetching,
    immunizations,
    idToImmunization,
  };
};
