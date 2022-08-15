import {
  Medication,
  OrganizationMapper,
  VaccinationDoseMapper,
  VaccinationSchemeMapper,
} from '../../../core/models';
import {
  organizationApi,
  vaccinationDoseApi,
  vaccinationSchemeApi,
} from '../../../core/services/redux/fhir';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UseMedicationInfoResult {
  organizations?: ReturnType<
    typeof organizationApi.endpoints.get.useQuery
  >['data'];
  idToOrganization: ReturnType<typeof OrganizationMapper.curry>;
  vaccinationSchemes?: ReturnType<
    typeof vaccinationSchemeApi.endpoints.get.useQuery
  >['data'];
  idToVaccinationScheme: ReturnType<typeof VaccinationSchemeMapper.curry>;
  vaccinationDoses?: ReturnType<
    typeof vaccinationDoseApi.endpoints.get.useQuery
  >['data'];
  idToVaccinationDose: ReturnType<typeof VaccinationDoseMapper.curry>;
}
export const useMedicationInfo = (
  medications: Medication[] | undefined
): UseMedicationInfoResult => {
  const { data: organizations } = organizationApi.endpoints.get.useQuery({});
  const idToOrganization = OrganizationMapper.curry(
    (id) => organizations?.entities[id]
  );

  const { data: vaccinationSchemes } =
    vaccinationSchemeApi.endpoints.get.useQuery(
      medications
        ? {
            subject: medications.map((med) => med.id).join(','),
          }
        : skipToken
    );
  const idToVaccinationScheme = VaccinationSchemeMapper.curry(
    (id) => vaccinationSchemes?.entities[id]
  );

  const { data: vaccinationDoses } = vaccinationDoseApi.endpoints.get.useQuery(
    vaccinationSchemes
      ? {
          subject: vaccinationSchemes.ids.join(','),
        }
      : skipToken
  );
  const idToVaccinationDose = VaccinationDoseMapper.curry(
    (id) => vaccinationDoses?.entities[id]
  );

  return {
    organizations,
    idToOrganization,
    vaccinationSchemes,
    idToVaccinationScheme,
    vaccinationDoses,
    idToVaccinationDose,
  };
};
