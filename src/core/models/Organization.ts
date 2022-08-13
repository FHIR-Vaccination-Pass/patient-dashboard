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

  static fromResource(resource: FHIROrganization) {
    return new OrganizationMapper(resource);
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
