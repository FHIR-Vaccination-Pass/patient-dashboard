import { Api } from '@reduxjs/toolkit/query';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

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

const resourceNameToApis: Record<
  ResourceName,
  Api<any, any, any, ResourceName, any>[]
> = {
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

const messageHandler = (ev: MessageEvent<string>): void => {
  const notificationEvent = JSON.parse(ev.data) as FHIRNotificationEvent;
  const locationParts = notificationEvent.location.split('/');
  const resourceName = locationParts[0] as ResourceName;
  const resourceId = locationParts[1];

  console.log(
    `FHIRNotificationEvent: ${notificationEvent.operationType} ${resourceName}/${resourceId}`
  );

  for (const api of resourceNameToApis[resourceName]) {
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

const socket = new WebSocket(settings.fhir.websocketUrl);
socket.addEventListener('message', messageHandler);
