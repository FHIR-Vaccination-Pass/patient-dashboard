import { Api } from '@reduxjs/toolkit/query';
import {
  FullTagDescription,
  TagDescription,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { settings } from '../../../../settings';
import { ResourceName } from './types';
import { activeVaccinationSchemeApi } from './activeVaccinationSchemeApi';
import { immunizationApi } from './immunizationApi';
import { immunizationRecommendationApi } from './immunizationRecommendationApi';
import { medicationApi } from './medicationApi';
import { organizationApi } from './organizationApi';
import { patientApi } from './patientApi';
import { populationRecommendationApi } from './populationRecommendationApi';
import { practitionerApi } from './practitionerApi';
import { targetDiseaseApi } from './targetDiseaseApi';
import { vacationPlanApi } from './vacationPlanApi';
import { vaccinationDoseApi } from './vaccinationDoseApi';
import { vaccinationSchemeApi } from './vaccinationSchemeApi';
import { store } from '../store';

interface FHIRNotificationEvent {
  lastUpdated: string;
  location: string;
  operationType: 'create' | 'update';
  resourceId: string;
  datasourceId: string;
  tenantId: string;
}

let __resourceNameToApis: Record<
  ResourceName,
  Api<any, any, any, ResourceName, any>[]
>;
let __ownUpdates: Set<string>;
let __socket: WebSocket;

const messageHandler = (ev: MessageEvent<string>): void => {
  const notificationEvent = JSON.parse(ev.data) as FHIRNotificationEvent;
  const locationParts = notificationEvent.location.split('/');
  const resourceName = locationParts[0] as ResourceName;
  const resourceId = locationParts[1];

  console.log(
    `FHIRNotificationEvent: ${notificationEvent.operationType} ${resourceName}/${resourceId}`
  );

  if (__ownUpdates.delete(`${resourceName}/${resourceId}`)) {
    console.log(`FHIRNotificationEvent: is own update`);
    return;
  }

  for (const api of __resourceNameToApis[resourceName]) {
    const tags: TagDescription<ResourceName>[] =
      notificationEvent.operationType === 'create'
        ? [
            { type: resourceName, id: resourceId },
            { type: resourceName, id: 'LIST' },
          ]
        : [{ type: resourceName, id: resourceId }];
    const action = api.util.invalidateTags(tags);
    store.dispatch(action);
  }
};

export const addOwnUpdate = (tag: FullTagDescription<ResourceName>): void => {
  __ownUpdates.add(`${tag.type}/${tag.id}`);
};

export const initNotificationWebsocket = (): void => {
  __resourceNameToApis = {
    Basic: [
      activeVaccinationSchemeApi,
      populationRecommendationApi,
      targetDiseaseApi,
      vacationPlanApi,
      vaccinationDoseApi,
      vaccinationSchemeApi,
    ],
    Immunization: [immunizationApi],
    ImmunizationRecommendation: [immunizationRecommendationApi],
    Medication: [medicationApi],
    Organization: [organizationApi],
    Patient: [patientApi],
    Practitioner: [practitionerApi],
  };
  __ownUpdates = new Set<string>();
  __socket = new WebSocket(settings.fhir.websocketUrl);
  __socket.addEventListener('message', messageHandler);
};
