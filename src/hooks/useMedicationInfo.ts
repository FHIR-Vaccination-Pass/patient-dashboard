import { Medication } from '../core/models';
import { skipToken } from '@reduxjs/toolkit/query';
import { useOrganizations } from './useOrganizations';
import { useVaccinationSchemes } from './useVaccinationSchemes';
import { useVaccinationDoses } from './useVaccinationDoses';

export interface UseMedicationInfoResult {
  organizations?: ReturnType<typeof useOrganizations>['data'];
  idToOrganization: ReturnType<typeof useOrganizations>['idToOrganization'];
  vaccinationSchemes?: ReturnType<typeof useVaccinationSchemes>['data'];
  idToVaccinationScheme: ReturnType<
    typeof useVaccinationSchemes
  >['idToVaccinationScheme'];
  vaccinationDoses?: ReturnType<typeof useVaccinationDoses>['data'];
  idToVaccinationDose: ReturnType<
    typeof useVaccinationDoses
  >['idToVaccinationDose'];
}
export const useMedicationInfo = (
  medications: Medication[] | undefined
): UseMedicationInfoResult => {
  const { data: organizations, idToOrganization } = useOrganizations({});
  const { data: vaccinationSchemes, idToVaccinationScheme } =
    useVaccinationSchemes(
      medications
        ? {
            subject: medications.map((med) => med.id).join(','),
          }
        : skipToken
    );
  const { data: vaccinationDoses, idToVaccinationDose } = useVaccinationDoses(
    vaccinationSchemes
      ? {
          subject: vaccinationSchemes.ids.join(','),
        }
      : skipToken
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
