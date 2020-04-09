import React from 'react';
import { Login } from '../components';

export const LoginPage = (props) => {
  return (
    <Login firebase={props.firebase} authUser={props.authUser} />
  );
}

export default LoginPage;
