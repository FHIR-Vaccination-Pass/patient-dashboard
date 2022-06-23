import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';
import { FC, useEffect } from 'react';
import { LandingPage } from './views/landingpage';
import Dashboard from './views/dashbaord/dashboard';
import { Overview } from './views/dashbaord/overview';
import { VaccineHistory } from './views/dashbaord/vaccineHistory';
import { VaccineRecommendations } from './views/dashbaord/vaccineRecommendations';
import { VaccineWiki } from './views/dashbaord/vaccineWiki';
import { VaccineDetailPage } from './views/dashbaord/vaccineDetailPage';
import { Profile } from './views/dashbaord/profile';
import { Settings } from './views/dashbaord/settings';
import NotFound from './views/NotFound';

const RequireAuth: FC = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  return <>{initialized && keycloak.authenticated && children}</>;
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
