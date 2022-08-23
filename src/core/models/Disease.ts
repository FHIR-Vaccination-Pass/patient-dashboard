import { CodeableConcept } from './CodeableConcept';
import {
  Basic as FHIRBasic,
  Coding as FHIRCoding,
  Extension as FHIRExtension,
} from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

import { settings } from '../../settings';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export interface Disease {
  id: string;
  code: CodeableConcept;
  name: string;
  description: string;
}

export class DiseaseMapper implements Disease {
  private _raw: FHIRBasic;
  private _targetDiseaseExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._targetDiseaseExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-target-disease-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic ? DiseaseMapper : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): DiseaseMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new DiseaseMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (id: string | undefined) => DiseaseMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  static fromModel({ id, code, name, description }: Disease): DiseaseMapper {
    return new DiseaseMapper({
      id: id || uuidv4(),
      resourceType: 'Basic',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-target-disease`] },
      code: { coding: [{ code: 'TargetDisease' }] },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-target-disease-extension`,
          extension: [
            {
              url: 'code',
              valueCodeableConcept: {
                coding: [
                  { system: code.coding.system, code: code.coding.code },
                ],
              },
            },
            {
              url: 'name',
              valueString: name,
            },
            {
              url: 'description',
              valueMarkdown: description,
            },
          ],
        },
      ],
    });
  }

  toResource(): FHIRBasic {
    return this._raw;
  }

  get id(): string {
    return this._raw.id!;
  }

  get _codeCoding(): FHIRCoding {
    return fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'code').value.coding.where(system = 'http://hl7.org/fhir/sid/icd-10')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRCoding;
  }

  get code(): CodeableConcept {
    return {
      coding: {
        code: this._codeCoding.code!,
        system: this._codeCoding.system!,
      },
    };
  }

  set code(code: CodeableConcept) {
    this._codeCoding.code = code.coding.code;
    this._codeCoding.system = code.coding.system;
  }

  withCode(code: CodeableConcept): DiseaseMapper {
    const newDisease = cloneDeep(this);
    newDisease.code = code;
    return newDisease;
  }

  get _nameExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'name')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get name(): string {
    return this._nameExtension.valueString!;
  }

  set name(name: string) {
    this._nameExtension.valueString = name;
  }

  withName(name: string): DiseaseMapper {
    const newDisease = cloneDeep(this);
    newDisease.name = name;
    return newDisease;
  }

  get _descriptionExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._targetDiseaseExtension,
      `extension.where(url = 'description')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get description(): string {
    return this._descriptionExtension.valueMarkdown!;
  }

  set description(description: string) {
    this._descriptionExtension.valueMarkdown = description;
  }

  withDescription(description: string): DiseaseMapper {
    const newDisease = cloneDeep(this);
    newDisease.description = description;
    return newDisease;
  }
}
