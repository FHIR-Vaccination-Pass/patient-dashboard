import React, { FC } from 'react';
import SignUpCard from '../../components/authentication/signupCard';
import AuthenticationWrapper from './AuthenticationWrapper';

const SignUp: FC = () => (
  <AuthenticationWrapper>
    <SignUpCard />
  </AuthenticationWrapper>
);

export default SignUp;
