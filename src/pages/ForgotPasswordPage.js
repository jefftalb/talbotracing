import React from 'react';
import { ForgotPassword } from '../components';

export const ForgotPasswordPage = (props) => {
  return (
    <ForgotPassword firebase={props.firebase} />
  );
}

export default ForgotPasswordPage;
