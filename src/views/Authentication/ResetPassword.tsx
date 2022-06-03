import React, { FC } from 'react';
import ResetPasswordForm from '../../components/authentication/resetPassword';
import AuthenticationWrapper from './AuthenticationWrapper';

const ResetPassword: FC = () => (
  <AuthenticationWrapper>
    <ResetPasswordForm />
  </AuthenticationWrapper>
);

export default ResetPassword;
