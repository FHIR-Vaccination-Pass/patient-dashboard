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
  VaccinationDoseRepeating,
  VaccinationDoseSingle,
} from '../../models/VaccinationDose';
import { ResourceMapper } from './ResourceMapper';
import { MockRecommendations } from '../../mockData/mockImmunizationRecommendation';
import { MockImmunizations } from '../../mockData/mockImmunizations';
import { MockPatients } from '../../mockData/mockPatients';
import { MockPractitioners } from '../../mockData/mockPractitioners';
import { MockMedications } from '../../mockData/mockMedications';
import { MockDisease } from '../../mockData/mockDisease';
import { MockPopulationRecommendations } from '../../mockData/mockPopulationRecommendations';
import { MockVaccinationSchemes } from '../../mockData/mockVaccinationSchemes';
import { MockSubstances } from '../../mockData/mockSubstances';
import { MockOrganizations } from '../../mockData/mockOrganizations';
import { MockVaccinationDosesSingle } from '../../mockData/mockVaccinationDosesSingle';
import { MockVaccinationDosesRepeating } from '../../mockData/mockVaccinationDosesRepeating';
import { CodeableConcept } from '../../models/CodeableConcept';

export class MockReferenceResolver implements ResourceMapper {
  private _recommendationDict: Map<string, ImmunizationRecommendation>;
  private _immunizationDict: Map<string, Immunization>;
  private _patientDict: Map<string, Patient>;
  private _practitionerDict: Map<string, Practitioner>;
  private _medicationDict: Map<string, Medication>;
  private _medicationByCodeDict: Map<string, Medication>;
  private _diseaseDict: Map<string, Disease>;
  private _populationRecommendationDict: Map<string, PopulationRecommendation>;
  private _vaccinationSchemeDict: Map<string, VaccinationScheme>;
  private _substanceDict: Map<string, Substance>;
  private _organizationDict: Map<string, Organization>;
  private _vaccinationDoseSingleDict: Map<string, VaccinationDoseSingle>;
  private _vaccinationDoseRepeatingDict: Map<string, VaccinationDoseRepeating>;

  constructor() {
    this._recommendationDict = MockRecommendations;
    this._immunizationDict = MockImmunizations;
    this._patientDict = MockPatients;
    this._practitionerDict = MockPractitioners;
    this._medicationDict = MockMedications;
    this._diseaseDict = MockDisease;
    this._populationRecommendationDict = MockPopulationRecommendations;
    this._vaccinationSchemeDict = MockVaccinationSchemes;
    this._substanceDict = MockSubstances;
    this._organizationDict = MockOrganizations;
    this._vaccinationDoseSingleDict = MockVaccinationDosesSingle;
    this._vaccinationDoseRepeatingDict = MockVaccinationDosesRepeating;
    this._medicationByCodeDict = new Map<string, Medication>();

    Array.from(this._medicationDict.values()).map((medication) =>
      this._medicationByCodeDict.set(medication.code.text, medication)
    );
  }

  getMedicationByVaccineCode(code: CodeableConcept): Medication | undefined {
    return this._medicationByCodeDict.get(code.text);
  }

  public getRecommendationById(
    id: string
  ): ImmunizationRecommendation | undefined {
    return this._recommendationDict.get(id);
  }

  public getImmunizationById(id: string): Immunization | undefined {
    return this._immunizationDict.get(id);
  }

  public getPatientById(id: string): Patient | undefined {
    return this._patientDict.get(id);
  }

  public getPractitionerById(id: string): Practitioner | undefined {
    return this._practitionerDict.get(id);
  }

  public getMedicationById(id: string): Medication | undefined {
    return this._medicationDict.get(id);
  }

  public getDiseaseById(id: string): Disease | undefined {
    return this._diseaseDict.get(id);
  }

  public getPopulationRecommendationById(
    id: string
  ): PopulationRecommendation | undefined {
    return this._populationRecommendationDict.get(id);
  }

  public getVaccinationSchemeById(id: string): VaccinationScheme | undefined {
    return this._vaccinationSchemeDict.get(id);
  }

  public getSubstanceById(id: string): Substance | undefined {
    return this._substanceDict.get(id);
  }

  public getOrganizationById(id: string): Organization | undefined {
    return this._organizationDict.get(id);
  }

  public getVaccinationDoseById(id: string): VaccinationDose | undefined {
    if (this._vaccinationDoseSingleDict.has(id))
      return this._vaccinationDoseSingleDict.get(id);
    return this._vaccinationDoseRepeatingDict.get(id);
  }

  get recommendationDict(): Map<string, ImmunizationRecommendation> {
    return this._recommendationDict;
  }

  set recommendationDict(value: Map<string, ImmunizationRecommendation>) {
    this._recommendationDict = value;
  }

  get immunizationDict(): Map<string, Immunization> {
    return this._immunizationDict;
  }

  set immunizationDict(value: Map<string, Immunization>) {
    this._immunizationDict = value;
  }

  get patientDict(): Map<string, Patient> {
    return this._patientDict;
  }

  set patientDict(value: Map<string, Patient>) {
    this._patientDict = value;
  }

  get practitionerDict(): Map<string, Practitioner> {
    return this._practitionerDict;
  }

  set practitionerDict(value: Map<string, Practitioner>) {
    this._practitionerDict = value;
  }

  get medicationDict(): Map<string, Medication> {
    return this._medicationDict;
  }

  set medicationDict(value: Map<string, Medication>) {
    this._medicationDict = value;
  }

  get diseaseDict(): Map<string, Disease> {
    return this._diseaseDict;
  }

  set diseaseDict(value: Map<string, Disease>) {
    this._diseaseDict = value;
  }

  get populationRecommendationDict(): Map<string, PopulationRecommendation> {
    return this._populationRecommendationDict;
  }

  set populationRecommendationDict(
    value: Map<string, PopulationRecommendation>
  ) {
    this._populationRecommendationDict = value;
  }

  get vaccinationSchemeDict(): Map<string, VaccinationScheme> {
    return this._vaccinationSchemeDict;
  }

  set vaccinationSchemeDict(value: Map<string, VaccinationScheme>) {
    this._vaccinationSchemeDict = value;
  }

  get substanceDict(): Map<string, Substance> {
    return this._substanceDict;
  }

  set substanceDict(value: Map<string, Substance>) {
    this._substanceDict = value;
  }

  get organizationDict(): Map<string, Organization> {
    return this._organizationDict;
  }

  set organizationDict(value: Map<string, Organization>) {
    this._organizationDict = value;
  }

  get vaccinationDoseSingleDict(): Map<string, VaccinationDoseSingle> {
    return this._vaccinationDoseSingleDict;
  }

  set vaccinationDoseSingleDict(value: Map<string, VaccinationDoseSingle>) {
    this._vaccinationDoseSingleDict = value;
  }

  get vaccinationDoseRepeatingDict(): Map<string, VaccinationDoseRepeating> {
    return this._vaccinationDoseRepeatingDict;
  }

  set vaccinationDoseRepeatingDict(
    value: Map<string, VaccinationDoseRepeating>
  ) {
    this._vaccinationDoseRepeatingDict = value;
  }

  getImmunizations(): Immunization[] {
    return Array.from(this._immunizationDict.values());
  }

  getRecommendations(): ImmunizationRecommendation[] {
    return Array.from(this._recommendationDict.values());
  }

  getDiseases(): Disease[] {
    return Array.from(this._diseaseDict.values());
  }

  getAllVaccinationSchemes(): VaccinationScheme[] {
    return Array.from(this._vaccinationSchemeDict.values());
  }

  getAllSingleVaccinationDoses(): VaccinationDoseSingle[] {
    return Array.from(this._vaccinationDoseSingleDict.values());
  }

  getDiseaseByCode(code: string): Disease | undefined {
    return Array.from(this._diseaseDict.values()).find(
      (disease: Disease) => disease.code.text === code
    );
  }

  getNumberOfDosesByMedicationId(medicationId: string | undefined): number {
    if (medicationId !== undefined) {
      return this.getAllSingleVaccinationDoses().filter(
        (dose) =>
          dose.vaccinationSchemeId ===
          this.getAllVaccinationSchemes().find(
            (scheme) => scheme.medicationId === medicationId
          )?.id
      )?.length;
    } else return -1;
  }
}
