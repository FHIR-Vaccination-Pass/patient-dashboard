import React, { FC } from 'react';
import ForgotPasswordForm from '../../components/authentication/forgotPasswordCard';
import AuthenticationWrapper from './AuthenticationWrapper';

const ForgotPassword: FC = () => (
  <AuthenticationWrapper>
    <ForgotPasswordForm />
  </AuthenticationWrapper>
);

export default ForgotPassword;
