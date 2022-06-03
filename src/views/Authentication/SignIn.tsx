import SignInCard from '../../components/authentication/signinCard';
import React, { FC } from 'react';
import AuthenticationWrapper from './AuthenticationWrapper';

const SignIn: FC = () => (
  <AuthenticationWrapper>
    <SignInCard />
  </AuthenticationWrapper>
);

export default SignIn;
