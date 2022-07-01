import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';
import { FC, useEffect } from 'react';
import { LandingPage } from './views/landingpage';
import Dashboard from './views/dashboard/dashboard';
import { Overview } from './views/dashboard/overview';
import { VaccineHistory } from './views/dashboard/vaccineHistory';
import { VaccineRecommendations } from './views/dashboard/vaccineRecommendations';
import { VaccineWiki } from './views/wiki/vaccineWiki';
import { VaccineDetailPage } from './views/wiki/vaccineDetailPage';
import { Profile } from './views/dashboard/profile';
import { Settings } from './views/dashboard/settings';
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
      <Route path='recommendations' element={<VaccineRecommendations />} />
      <Route path='wiki' element={<VaccineWiki />} />
      <Route path='wiki/*' element={<VaccineDetailPage />} />
      <Route path='profile' element={<Profile />} />
      <Route path='settings' element={<Settings />} />
    </Route>
    <Route path='/404' element={<NotFound />} />
    <Route path='*' element={<Navigate to='/404' replace />} />
  </Routes>
);

export default AppRoutes;
