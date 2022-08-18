import { activeVaccinationSchemeApi } from '../core/services/redux/fhir';
import { ActiveVaccinationSchemeMapper } from '../core/models';
import { GetResponse } from '../core/services/redux/fhir/utils';
import {
  GetArgs,
  GetResponseGroups,
  TResource,
} from '../core/services/redux/fhir/activeVaccinationSchemeApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseActiveVaccinationSchemesReturnType {
  data?: GetResponse<TResource, GetResponseGroups>;
  activeVaccinationSchemes?: ActiveVaccinationSchemeMapper[];
  idToActiveVaccinationScheme: (
    id: string | undefined
  ) => ActiveVaccinationSchemeMapper | undefined;
}

export const useActiveVaccinationSchemes = (
  arg: GetArgs | typeof skipToken
): UseActiveVaccinationSchemesReturnType => {
  const { data } = activeVaccinationSchemeApi.endpoints.get.useQuery(arg);
  const idToActiveVaccinationScheme = ActiveVaccinationSchemeMapper.curry(
    (id) => data?.entities[id]
  );
  const activeVaccinationSchemes = data?.ids.map(
    (id: string) => idToActiveVaccinationScheme(id)!
  );

  return {
    data,
    activeVaccinationSchemes,
    idToActiveVaccinationScheme,
  };
};
