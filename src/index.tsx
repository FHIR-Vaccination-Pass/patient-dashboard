import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import { LandingPage } from './views/LandingPage';
import SignIn from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import ForgotPassword from './views/Authentication/ForgotPassword';
import ResetPassword from './views/Authentication/ResetPassword';
import NotFound from './views/NotFound';
import Dashboard from './views/dashbaord/dashboard';
import { Overview } from './views/dashbaord/overview';
import { VaccineHistory } from './views/dashbaord/vaccineHistory';
import { VaccineRecommendations } from './views/dashbaord/vaccineRecommendations';
import { VaccineWiki } from './views/dashbaord/vaccineWiki';
import { Profile } from './views/dashbaord/profile';
import { Settings } from './views/dashbaord/settings';
import { VaccineDetailPage } from './views/dashbaord/vaccineDetailPage';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Overview />} />
          <Route path='history' element={<VaccineHistory />} />
          <Route path='recommendations' element={<VaccineRecommendations />} />
          <Route path='wiki' element={<VaccineWiki />}>
            <Route path='*' element={<VaccineDetailPage />} />
          </Route>
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
