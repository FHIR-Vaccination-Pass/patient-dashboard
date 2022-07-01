import {
  CodeableConcept,
  ImmunizationRecommendationRecommendation,
  ImmunizationRecommendationRecommendationDateCriterion,
} from 'fhir/r4';

export class ImmunizationRecommendation
  implements ImmunizationRecommendationRecommendation
{
  id: string | undefined;
  dateCriterion:
    | ImmunizationRecommendationRecommendationDateCriterion[]
    | undefined;
  forecastStatus: CodeableConcept;
  forecastReason: CodeableConcept[] | undefined;
  targetDisease: CodeableConcept | undefined;
  isDeactivated: boolean;

  constructor(
    id: string | undefined,
    dateCriterion:
      | ImmunizationRecommendationRecommendationDateCriterion[]
      | undefined,
    forecastStatus: CodeableConcept,
    forecastReason: CodeableConcept[] | undefined,
    targetDisease: CodeableConcept | undefined,
    isDeactivated: boolean
  ) {
    this.id = id;
    this.dateCriterion = dateCriterion;
    this.forecastStatus = forecastStatus;
    this.forecastReason = forecastReason;
    this.targetDisease = targetDisease;
    this.isDeactivated = isDeactivated;
  }
}
