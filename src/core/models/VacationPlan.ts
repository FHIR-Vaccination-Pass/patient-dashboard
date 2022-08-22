import { Location, LocationMapper } from './Location';

import { Basic as FHIRBasic, Extension as FHIRExtension } from 'fhir/r4';
import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';
import { settings } from '../../settings';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

export interface VacationPlan {
  id: string;
  departureDate: Date;
  locations: Location[];
  patientId: string;
}

export class VacationPlanMapper {
  private _raw: FHIRBasic;
  private _vacationPlanExtension: FHIRExtension;

  constructor(resource: FHIRBasic) {
    this._raw = resource;

    this._vacationPlanExtension = fhirpath.evaluate(
      this._raw,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-vacation-plan-extension')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  static fromResource<T extends FHIRBasic | undefined>(
    resource: T
  ): T extends FHIRBasic ? VacationPlanMapper : undefined;

  static fromResource(
    resource: FHIRBasic | undefined
  ): VacationPlanMapper | undefined {
    if (resource === undefined) {
      return undefined;
    }
    return new VacationPlanMapper(resource);
  }

  static curry(
    lookupFunc: (id: string) => FHIRBasic | undefined
  ): (id: string | undefined) => VacationPlanMapper | undefined {
    return (id) =>
      this.fromResource(id === undefined ? undefined : lookupFunc(id));
  }

  fromModel({
    id,
    departureDate,
    locations,
    patientId,
  }: VacationPlan): VacationPlanMapper {
    return new VacationPlanMapper({
      id,
      resourceType: 'Basic',
      meta: { profile: [`${settings.fhir.profileBaseUrl}/vp-vacation-plan`] },
      code: { coding: [{ code: 'VacationPlan' }] },
      subject: { reference: `Patient/${patientId}` },
      extension: [
        {
          url: `${settings.fhir.profileBaseUrl}/vp-vacation-plan-extension`,
          extension: [
            {
              url: 'departureDate',
              valueDate: dayjs(departureDate).format('YYYY-MM-DD'),
            },
            ...locations.map((l) => LocationMapper.fromModel(l).toResource()),
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

  get _departureDateExtension(): FHIRExtension {
    return fhirpath.evaluate(
      this._vacationPlanExtension,
      `extension.where(url = 'departureDate')`,
      undefined,
      fhirpath_r4_model
    )[0] as FHIRExtension;
  }

  get departureDate(): Date {
    return new Date(this._departureDateExtension.valueDate!);
  }

  set departureDate(departureDate: Date) {
    this._departureDateExtension.valueDate =
      dayjs(departureDate).format('YYYY-MM-DD');
  }

  withDepartureDate(departureDate: Date): VacationPlanMapper {
    const newVacationPlan = cloneDeep(this);
    newVacationPlan.departureDate = departureDate;
    return newVacationPlan;
  }

  get _locationExtensions(): FHIRExtension[] {
    return fhirpath.evaluate(
      this._vacationPlanExtension,
      `extension.where(url = '${settings.fhir.profileBaseUrl}/vp-location-extension')`,
      undefined,
      fhirpath_r4_model
    ) as FHIRExtension[];
  }

  get locations(): LocationMapper[] {
    return this._locationExtensions.map(LocationMapper.fromResource);
  }

  set locations(locations: LocationMapper[]) {
    this._vacationPlanExtension.extension = this._vacationPlanExtension
      .extension!.filter((ex) => !this._locationExtensions.includes(ex))
      .concat(locations.map((l) => l.toResource()));
  }

  withLocations(locations: LocationMapper[]): VacationPlanMapper {
    const newVacationPlan = cloneDeep(this);
    newVacationPlan.locations = locations;
    return newVacationPlan;
  }

  get patientId(): string {
    const referenceParts = this._raw.subject!.reference!.split('/');
    return referenceParts[referenceParts.length - 1];
  }

  set patientId(patientId: string) {
    this._raw.subject!.reference = `Patient/${patientId}`;
  }

  withPatientId(patientId: string): VacationPlanMapper {
    const newVacationPlan = cloneDeep(this);
    newVacationPlan.patientId = patientId;
    return newVacationPlan;
  }
}
