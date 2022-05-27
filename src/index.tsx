import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import Landingpage from './views/landingpage/landingpage';
import SignIn from './views/authentication/SignIn';
import SignUp from './views/authentication/SignUp';
import ForgotPassword from './views/authentication/ForgotPassword';
import NotFound from './views/NotFound';
import Dashboard from './views/dashbaord/dashboard';
import { Overview } from './views/dashbaord/overview';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Overview />} />
        </Route>
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
