import * as React from 'react';
// import AuthForm from 'components/auth/AuthForm';
import FormContainer from 'containers/auth/FormContainer';

const AuthPage = () => {
  const category = window.location.pathname.includes('login')
    ? 'login'
    : 'register';
  return (
    <>
      <FormContainer category={category} />
    </>
  );
};

export default AuthPage;
