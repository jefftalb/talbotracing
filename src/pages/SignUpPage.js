import React from 'react';
import { SignUp } from '../components';

export const SignUpPage = (props) => {
  return (
    <SignUp firebase={props.firebase} authUser={props.authUser} />
  );
}

export default SignUpPage;
