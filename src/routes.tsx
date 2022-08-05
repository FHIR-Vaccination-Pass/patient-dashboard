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
import Settings from './mdViews/settings/settings';
import { Patient } from './mdViews/patient/patient';
import { MDOverview } from './mdViews/dashboard/overview';
import MDDashboard from './mdViews/dashboard/dashboard';

const RequireAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  console.log(keycloak?.idTokenParsed?.realm_access?.roles);
  // const roles =
  //   keycloak?.idTokenParsed?.resource_access?.['patient-dashboard'].roles;
  const roles = keycloak?.idTokenParsed?.realm_access?.roles;
  console.log(roles?.includes('patient'));
  return (
    <>
      {initialized &&
        keycloak?.authenticated &&
        children &&
        roles?.includes('patient')}
    </>
  );
};

const RequireMDAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  console.log(keycloak?.idTokenParsed?.realm_access?.roles);
  const roles = keycloak?.idTokenParsed?.realm_access?.roles;
  console.log(roles?.includes('md'));
  return (
    <>
      {initialized &&
        keycloak?.authenticated &&
        children &&
        roles?.includes('md')}
    </>
  );
};

const AppRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route
      path='patient/dashboard'
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
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
      <Route path='settings' element={<Settings />} />
      <Route path='patient/*' element={<Patient />}>
        <Route path='history' element={<VaccineHistory />} />
      </Route>
    </Route>
    <Route path='/404' element={<NotFound />} />
    <Route path='*' element={<Navigate to='/404' replace />} />
  </Routes>
);

export default AppRoutes;
