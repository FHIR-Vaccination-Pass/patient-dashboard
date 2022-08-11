import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';
import { FC, useEffect } from 'react';
import { LandingPage } from './patientViews/landingpage';
import Dashboard from './patientViews/dashboard/dashboard';
import { Overview } from './patientViews/dashboard/overview';
import { VaccineHistory } from './patientViews/history/vaccineHistory';
import { ImmunizationWiki } from './patientViews/wiki/immunizationWiki';
import { VaccineDetailPage } from './patientViews/wiki/vaccineDetailPage';
import { Profile } from './patientViews/dashboard/profile';
import NotFound from './patientViews/NotFound';
import DiseaseInformation from './mdViews/settings/diseaseInformation';
import { Patient } from './mdViews/patient/patient';
import { MDOverview } from './mdViews/dashboard/overview';
import MDDashboard from './mdViews/dashboard/dashboard';
import VaccineInformation from './mdViews/settings/vaccineInformation';

const RequirePatientAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  // const roles =
  //   keycloak?.idTokenParsed?.resource_access?.['patient-dashboard'].roles;
  const roles = keycloak?.idTokenParsed?.realm_access?.roles;
  return <>{initialized && keycloak?.authenticated && children}</>;
};

const RequireMDAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  const roles = keycloak?.idTokenParsed?.realm_access?.roles;
  return <>{initialized && keycloak?.authenticated && children}</>; // TODO: Add role checking like && roles?.includes('md')
};

const RequireUniversalAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  const roles = keycloak?.idTokenParsed?.realm_access?.roles;
  return <>{initialized && keycloak?.authenticated && children}</>;
};

const AppRoutes: FC = () => (
  <Routes>
    <Route
      path='/'
      element={
        <RequireUniversalAuth>
          <LandingPage />
        </RequireUniversalAuth>
      }
    />
    <Route
      path='patient/dashboard'
      element={
        <RequirePatientAuth>
          <Dashboard />
        </RequirePatientAuth>
      }
    >
      <Route path='' element={<Overview />} />
      <Route path='history' element={<VaccineHistory />} />
      <Route path='wiki' element={<ImmunizationWiki />} />
      <Route path='wiki/*' element={<VaccineDetailPage />} />
      <Route path='profile' element={<Profile />} />
    </Route>
    <Route
      path='md/dashboard'
      element={
        <RequireMDAuth>
          <MDDashboard />
        </RequireMDAuth>
      }
    >
      <Route path='' element={<MDOverview />} />
      <Route path='diseases' element={<DiseaseInformation />} />
      <Route path='vaccines' element={<VaccineInformation />} />
      <Route path='patient/*' element={<Patient />}>
        <Route path='history' element={<VaccineHistory />} />
      </Route>
    </Route>
    <Route path='/404' element={<NotFound />} />
    <Route path='*' element={<Navigate to='/404' replace />} />
  </Routes>
);

export default AppRoutes;
