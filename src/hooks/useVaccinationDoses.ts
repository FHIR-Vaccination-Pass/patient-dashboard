import { vaccinationDoseApi } from '../core/services/redux/fhir';
import { VaccinationDoseMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/vaccinationDoseApi';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  VaccinationDoseRepeatingMapper,
  VaccinationDoseSingleMapper,
} from '../core/models/VaccinationDose';

export interface UseVaccinationDosesReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  vaccinationDoses?: (
    | VaccinationDoseSingleMapper
    | VaccinationDoseRepeatingMapper
  )[];
  idToVaccinationDose: (
    id: string | undefined
  ) => VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper | undefined;
}

export const useVaccinationDoses = (
  arg: GetArgs | typeof skipToken
): UseVaccinationDosesReturnType => {
  const { data } = vaccinationDoseApi.endpoints.get.useQuery(arg);
  const idToVaccinationDose = VaccinationDoseMapper.curry(
    (id) => data?.entities[id]
  );
  const vaccinationDoses = data?.ids.map(
    (id: string) => idToVaccinationDose(id)!
  );

  return {
    data,
    vaccinationDoses,
    idToVaccinationDose,
  };
};
