import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import Landingpage from './views/landingpage/landingpage';
import SignIn from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import ForgotPassword from './views/Authentication/ForgotPassword';
import ResetPassword from './views/Authentication/ResetPassword';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route
          path='/404'
          element={
            <main style={{ padding: '1rem' }}>
              <p>
                404: ääätsch, there's nothing here! Go back with this{' '}
                <Link to='/'>
                  <Button colorScheme='teal' variant='outline' size='xs'>
                    Button
                  </Button>
                </Link>
              </p>
            </main>
          }
        />
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
