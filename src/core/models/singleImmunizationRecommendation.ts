import {
  CodeableConcept,
  ImmunizationRecommendationRecommendation,
  ImmunizationRecommendationRecommendationDateCriterion,
} from 'fhir/r4';

export class SingleImmunizationRecommendation
  implements ImmunizationRecommendationRecommendation
{
  id: string | undefined;
  dateCriterion:
    | ImmunizationRecommendationRecommendationDateCriterion[]
    | undefined;
  forecastStatus: CodeableConcept;
  forecastReason: CodeableConcept[] | undefined;
  targetDisease: CodeableConcept | undefined;

  constructor(
    id: string | undefined,
    dateCriterion:
      | ImmunizationRecommendationRecommendationDateCriterion[]
      | undefined,
    forecastStatus: CodeableConcept,
    forecastReason: CodeableConcept[] | undefined,
    targetDisease: CodeableConcept | undefined
  ) {
    this.id = id;
    this.dateCriterion = dateCriterion;
    this.forecastStatus = forecastStatus;
    this.forecastReason = forecastReason;
    this.targetDisease = targetDisease;
  }
}
