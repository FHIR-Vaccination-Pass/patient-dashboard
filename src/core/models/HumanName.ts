import { HumanName as FHIRHumanName } from 'fhir/r4';
import { cloneDeep } from 'lodash';

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

  static fromModel({ family, given }: HumanName): HumanNameMapper {
    return new HumanNameMapper({
      use: 'official',
      family,
      given,
    });
  }

  toResource(): FHIRHumanName {
    return this._raw;
  }

  get family(): string {
    return this._raw.family!;
  }

  set family(family: string) {
    this._raw.family = family;
  }

  withFamily(family: string): HumanNameMapper {
    const newHumanName = cloneDeep(this);
    newHumanName.family = family;
    return newHumanName;
  }

  get given(): string[] {
    return this._raw.given!;
  }

  set given(given: string[]) {
    this._raw.given = given;
  }

  withGiven(given: string[]): HumanNameMapper {
    const newHumanName = cloneDeep(this);
    newHumanName.given = given;
    return newHumanName;
  }
}
