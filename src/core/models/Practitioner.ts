import { HumanName, HumanNameMapper } from './HumanName';

import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  HumanName as FHIRHumanName,
  Practitioner as FHIRPractitioner,
} from 'fhir/r4';

export interface Practitioner {
  id: string;
  name: HumanName;
}

export class PractitionerMapper {
  private _raw: FHIRPractitioner;
  name: HumanName;

  constructor(resource: FHIRPractitioner) {
    this._raw = resource;

    const officialHumanName = fhirpath.evaluate(
      this._raw,
      `name.where(use = 'official')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRHumanName;
    this.name = HumanNameMapper.fromResource(officialHumanName);
  }

  static fromResource(resource: FHIRPractitioner) {
    return new PractitionerMapper(resource);
  }

  toResource(): FHIRPractitioner {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }
}
