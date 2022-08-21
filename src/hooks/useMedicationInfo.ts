import { Medication } from '../core/models';
import { skipToken } from '@reduxjs/toolkit/query';
import { useOrganizations } from './useOrganizations';
import { useVaccinationSchemes } from './useVaccinationSchemes';
import { useVaccinationDoses } from './useVaccinationDoses';

export interface UseMedicationInfoResult {
  organizationsData?: ReturnType<typeof useOrganizations>['data'];
  idToOrganization: ReturnType<typeof useOrganizations>['idToOrganization'];
  organizationsIsFetching: boolean;
  vaccinationSchemesData?: ReturnType<typeof useVaccinationSchemes>['data'];
  idToVaccinationScheme: ReturnType<
    typeof useVaccinationSchemes
  >['idToVaccinationScheme'];
  vaccinationSchemesIsFetching: boolean;
  vaccinationDosesData?: ReturnType<typeof useVaccinationDoses>['data'];
  idToVaccinationDose: ReturnType<
    typeof useVaccinationDoses
  >['idToVaccinationDose'];
  vaccinationDosesIsFetching: boolean;
}

export const useMedicationInfo = (
  medications: Medication[] | undefined
): UseMedicationInfoResult => {
  const {
    data: organizationsData,
    idToOrganization,
    isFetching: organizationsIsFetching,
  } = useOrganizations({});
  const {
    data: vaccinationSchemesData,
    idToVaccinationScheme,
    isFetching: vaccinationSchemesIsFetching,
  } = useVaccinationSchemes(
    medications
      ? {
          subject: medications.map((med) => med.id).join(','),
        }
      : skipToken
  );
  const {
    data: vaccinationDosesData,
    idToVaccinationDose,
    isFetching: vaccinationDosesIsFetching,
  } = useVaccinationDoses(
    vaccinationSchemesData
      ? {
          subject: vaccinationSchemesData.ids.join(','),
        }
      : skipToken
  );

  return {
    organizationsData,
    idToOrganization,
    organizationsIsFetching,
    vaccinationSchemesData,
    idToVaccinationScheme,
    vaccinationSchemesIsFetching,
    vaccinationDosesData,
    idToVaccinationDose,
    vaccinationDosesIsFetching,
  };
};
