import { Organization as FHIROrganization } from 'fhir/r4';
import { cloneDeep } from 'lodash';
import { settings } from '../../settings';
import { v4 as uuidv4 } from 'uuid';

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

  static fromModel({ id, name }: Organization): OrganizationMapper {
    return new OrganizationMapper({
      id: id || uuidv4(),
      resourceType: 'Organization',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-organization`] },
      name,
    });
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

  set name(name: string) {
    this._raw.name = name;
  }

  withName(name: string): OrganizationMapper {
    const newOrganization = cloneDeep(this);
    newOrganization.name = name;
    return newOrganization;
  }
}
