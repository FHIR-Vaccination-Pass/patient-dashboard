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

  static fromResource(resource: FHIRHumanName): HumanNameMapper {
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
