import { HumanName as FHIRHumanName } from 'fhir/r4';

export interface HumanName {
  family: string;
  given: string[];
}

export class HumanNameMapper implements HumanName {
  private _raw: FHIRHumanName;

  constructor(resource: FHIRHumanName) {
    this._raw = resource;
  }

  static fromResource<T extends FHIRHumanName | undefined>(
    resource: T
  ): T extends FHIRHumanName ? HumanNameMapper : undefined;

  static fromResource(
    resource: FHIRHumanName | undefined
  ): HumanNameMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new HumanNameMapper(resource);
  }

  toResource(): FHIRHumanName {
    return this._raw;
  }

  get family(): string {
    return this._raw.family!;
  }

  get given(): string[] {
    return this._raw.given!;
  }
}
