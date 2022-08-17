import { practitionerApi } from '../core/services/redux/fhir';
import { PractitionerMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/practitionerApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UsePractitionersReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  practitioners?: PractitionerMapper[];
  idToPractitioner: (id: string | undefined) => PractitionerMapper | undefined;
}

export const usePractitioners = (
  arg: GetArgs | typeof skipToken
): UsePractitionersReturnType => {
  const { data } = practitionerApi.endpoints.get.useQuery(arg);
  const idToPractitioner = PractitionerMapper.curry((id) => data?.entities[id]);
  const practitioners = data?.ids.map((id: string) => idToPractitioner(id)!);

  return {
    data,
    practitioners,
    idToPractitioner,
  };
};
