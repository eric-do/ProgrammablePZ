import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormContainer, LoginForm } from 'features/auth/components'

export const Login = () => {
  const history = useHistory();

  const onSuccess = () => history.push('/');

  return (
    <FormContainer title="Log in">
      <LoginForm onSuccess={onSuccess} />
    </FormContainer>
  )
};