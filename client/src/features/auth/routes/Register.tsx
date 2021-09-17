import React from 'react';
import { useHistory } from 'react-router';
import { FormContainer, RegisterForm } from 'features/auth/components'

export const Register = () => {
  const history = useHistory();

  const onSuccess = () => history.push('/');

  return (
    <FormContainer title="Sign up">
      <RegisterForm onSuccess={onSuccess} />
    </FormContainer>
  )
};