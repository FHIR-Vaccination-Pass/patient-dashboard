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

  static fromResource<T extends FHIRPractitioner | undefined>(
    resource: T
  ): T extends FHIRPractitioner ? PractitionerMapper : undefined;

  static fromResource(
    resource: FHIRPractitioner | undefined
  ): PractitionerMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new PractitionerMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRPractitioner | undefined
  ): (id: string | undefined) => PractitionerMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIRPractitioner {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }
}
