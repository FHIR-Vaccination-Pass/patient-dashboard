import { vaccinationSchemeApi } from '../core/services/redux/fhir';
import { VaccinationSchemeMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/vaccinationSchemeApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseVaccinationSchemesReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  isFetching: boolean;
  vaccinationSchemes?: VaccinationSchemeMapper[];
  idToVaccinationScheme: (
    id: string | undefined
  ) => VaccinationSchemeMapper | undefined;
}

export const useVaccinationSchemes = (
  arg: GetArgs | typeof skipToken
): UseVaccinationSchemesReturnType => {
  const { data, isFetching } = vaccinationSchemeApi.endpoints.get.useQuery(arg);
  const idToVaccinationScheme = VaccinationSchemeMapper.curry(
    (id) => data?.entities[id]
  );
  const vaccinationSchemes = data?.ids.map(
    (id: string) => idToVaccinationScheme(id)!
  );

  return {
    data,
    isFetching,
    vaccinationSchemes,
    idToVaccinationScheme,
  };
};
