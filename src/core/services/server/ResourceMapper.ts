import { ImmunizationRecommendation } from '../../models/ImmunizationRecommendation';
import { Immunization } from '../../models/Immunization';
import { Patient } from '../../models/Patient';
import { Practitioner } from '../../models/Practitioner';
import { Medication } from '../../models/Medication';
import { Disease } from '../../models/Disease';
import { PopulationRecommendation } from '../../models/PopulationRecommendation';
import { VaccinationScheme } from '../../models/VaccinationScheme';
import { Substance } from '../../models/Substance';
import { Organization } from '../../models/Organization';
import { VaccinationDose } from '../../models/VaccinationDose';

export interface ResourceMapper {
  getRecommendationById(id: string): ImmunizationRecommendation | undefined;

  getImmunizationById(id: string): Immunization | undefined;

  getPatientById(id: string): Patient | undefined;

  getPractitionerById(id: string): Practitioner | undefined;

  getmedicationById(id: string): Medication | undefined;

  getDiseaseById(id: string): Disease | undefined;

  getPopulationRecommendationById(
    id: string
  ): PopulationRecommendation | undefined;

  getVaccinationSchemeById(id: string): VaccinationScheme | undefined;

  getSubstanceById(id: string): Substance | undefined;

  getOrganizationById(id: string): Organization | undefined;

  getVaccinationDoseById(id: string): VaccinationDose | undefined;
}
