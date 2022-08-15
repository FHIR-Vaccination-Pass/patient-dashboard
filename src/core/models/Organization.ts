import { Organization as FHIROrganization } from 'fhir/r4';

export interface Organization {
  id: string;
  name: string;
}

export class OrganizationMapper implements Organization {
  private _raw: FHIROrganization;

  constructor(resource: FHIROrganization) {
    this._raw = resource;
  }

  static fromResource<T extends FHIROrganization | undefined>(
    resource: T
  ): T extends FHIROrganization ? OrganizationMapper : undefined;

  static fromResource(
    resource: FHIROrganization | undefined
  ): OrganizationMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new OrganizationMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIROrganization | undefined
  ): (id: string | undefined) => OrganizationMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  toResource(): FHIROrganization {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get name(): string {
    return this._raw.name!;
  }
}
