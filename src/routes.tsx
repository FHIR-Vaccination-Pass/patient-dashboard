import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';
import { FC, useEffect } from 'react';
import { LandingPage } from './views/landingpage';
import Dashboard from './views/dashboard/dashboard';
import { Overview } from './views/dashboard/overview';
import { VaccineHistory } from './views/history/vaccineHistory';
import { ImmunizationWiki } from './views/wiki/immunizationWiki';
import { VaccineDetailPage } from './views/wiki/vaccineDetailPage';
import { Profile } from './views/dashboard/profile';
import NotFound from './views/NotFound';

const RequireAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, keycloak?.authenticated]);

  return <>{initialized && keycloak?.authenticated && children}</>;
};

const AppRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route
      path='/dashboard'
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
    <Route path='/404' element={<NotFound />} />
    <Route path='*' element={<Navigate to='/404' replace />} />
  </Routes>
);

export default AppRoutes;
