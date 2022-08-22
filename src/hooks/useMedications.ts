import { medicationApi } from '../core/services/redux/fhir';
import { MedicationMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/medicationApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseMedicationsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  medications?: MedicationMapper[];
  idToMedication: (id: string | undefined) => MedicationMapper | undefined;
}

export const useMedications = (
  arg: GetArgs | typeof skipToken
): UseMedicationsReturnType => {
  const { data, isFetching } = medicationApi.endpoints.get.useQuery(arg);
  const idToMedication = MedicationMapper.curry((id) => data?.entities[id]);
  const medications = data?.ids.map((id: string) => idToMedication(id)!);

  return {
    data,
    isFetching,
    medications,
    idToMedication,
  };
};
