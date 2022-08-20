import { targetDiseaseApi } from '../core/services/redux/fhir';
import { DiseaseMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/targetDiseaseApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseTargetDiseasesReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  targetDiseases?: DiseaseMapper[];
  idToTargetDisease: (id: string | undefined) => DiseaseMapper | undefined;
}

export const useTargetDiseases = (
  arg: GetArgs | typeof skipToken
): UseTargetDiseasesReturnType => {
  const { data } = targetDiseaseApi.endpoints.get.useQuery(arg);
  const idToTargetDisease = DiseaseMapper.curry((id) => data?.entities[id]);
  const targetDiseases = data?.ids.map((id: string) => idToTargetDisease(id)!);

  return {
    data,
    targetDiseases,
    idToTargetDisease,
  };
};
