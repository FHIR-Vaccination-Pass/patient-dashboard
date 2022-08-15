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
import {
  VaccinationDose,
  VaccinationDoseSingle,
} from '../../models/VaccinationDose';
import { CodeableConcept } from '../../models/CodeableConcept';

export interface ResourceMapper {
  getAllImmunizations(): Immunization[];

  getAllRecommendations(): ImmunizationRecommendation[];

  getAllDiseases(): Disease[];

  getAllVaccinationSchemes(): VaccinationScheme[];

  getAllSingleVaccinationDoses(): VaccinationDoseSingle[];

  getRecommendationById(id: string): ImmunizationRecommendation | undefined;

  getImmunizationById(id: string): Immunization | undefined;

  getPatientById(id: string): Patient | undefined;

  getAllPatients(): Patient[];

  getPractitionerById(id: string): Practitioner | undefined;

  getMedicationById(id: string): Medication | undefined;

  getAllMedications(): Medication[];

  getDiseaseById(id: string): Disease | undefined;

  getDiseaseByCode(code: string): Disease | undefined;

  getPopulationRecommendationById(
    id: string
  ): PopulationRecommendation | undefined;

  getPopulationRecommendationByDiseaseId(
    diseaseId: string
  ): PopulationRecommendation | undefined;

  getVaccinationSchemeById(id: string): VaccinationScheme | undefined;

  getSubstanceById(id: string): Substance | undefined;

  getOrganizationById(id: string): Organization | undefined;

  getOrganizationByName(name: string): Organization | undefined;

  getVaccinationDoseById(id: string): VaccinationDose | undefined;

  getMedicationByVaccineCode(
    vaccineCode: CodeableConcept
  ): Medication | undefined;

  getNumberOfDosesByMedicationId(medicationId: string | undefined): number;

  getVaccinationSchemeByMedicationId(
    medicationId: string
  ): VaccinationScheme | undefined;

  // Not needed atm, but will probably be needed in the future
  getRecommendationsByPatientId(
    patientId: string
  ): ImmunizationRecommendation[];

  getVaccinationDosesForVaccinationSchemes(
    vaccinationSchemeIds: string[]
  ): Map<string, VaccinationDoseSingle[]>;

  saveDiseaseInformation(disease: Disease): Disease | undefined;

  saveVaccineInformation(medication: Medication): Medication | undefined;

  saveDose(dose: VaccinationDose): VaccinationDose | undefined;

  saveVaccinationScheme(
    vaccinationScheme: VaccinationScheme
  ): VaccinationScheme | undefined;
}
