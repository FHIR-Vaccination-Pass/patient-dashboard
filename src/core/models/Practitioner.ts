import { HumanName, HumanNameMapper } from './HumanName';

import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import {
  HumanName as FHIRHumanName,
  Practitioner as FHIRPractitioner,
} from 'fhir/r4';
import { cloneDeep } from 'lodash';
import { settings } from '../../settings';

export interface Practitioner {
  id: string;
  name: HumanName;
}

export class PractitionerMapper {
  private _raw: FHIRPractitioner;

  constructor(resource: FHIRPractitioner) {
    this._raw = resource;
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

  static fromModel({ id, name }: Practitioner): PractitionerMapper {
    return new PractitionerMapper({
      id,
      resourceType: 'Practitioner',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-practitioner`] },
      name: [HumanNameMapper.fromModel(name).toResource()],
    });
  }

  toResource(): FHIRPractitioner {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get _officialHumanName(): FHIRHumanName {
    return fhirpath.evaluate(
      this._raw,
      `name.where(use = 'official')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRHumanName;
  }

  get name(): HumanNameMapper {
    return HumanNameMapper.fromResource(this._officialHumanName);
  }

  set name(name: HumanNameMapper) {
    this._raw.name = this._raw.name!.map((hm) =>
      hm === this._officialHumanName ? name.toResource() : hm
    );
  }

  withName(name: HumanNameMapper): PractitionerMapper {
    const newPractitioner = cloneDeep(this);
    newPractitioner.name = name;
    return newPractitioner;
  }
}
