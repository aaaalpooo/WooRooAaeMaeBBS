import * as React from 'react';
// import AuthForm from 'components/auth/AuthForm';
import FormContainer from 'containers/auth/FormContainer';
import ModalContainer from 'containers/modals/ModalContainer';

const AuthPage = () => {
  const category = window.location.pathname.includes('login')
    ? 'login'
    : 'register';
  return (
    <>
      <FormContainer category={category} />
      <ModalContainer />
    </>
  );
};

export default AuthPage;
