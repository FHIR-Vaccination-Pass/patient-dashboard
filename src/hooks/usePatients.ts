import { patientApi } from '../core/services/redux/fhir';
import { PatientMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/patientApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UsePatientsReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  patients?: PatientMapper[];
  idToPatient: (id: string | undefined) => PatientMapper | undefined;
}

export const usePatients = (
  arg: GetArgs | typeof skipToken
): UsePatientsReturnType => {
  const { data, isFetching } = patientApi.endpoints.get.useQuery(arg);
  const idToPatient = PatientMapper.curry((id) => data?.entities[id]);
  const patients = data?.ids.map((id: string) => idToPatient(id)!);

  return {
    data,
    isFetching,
    patients,
    idToPatient,
  };
};
