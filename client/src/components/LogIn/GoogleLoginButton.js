import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = '990000531059-kfc3o2bo6rvj4mmnqbc8dkcmqj50kknb.apps.googleusercontent.com';

  const onSuccessHandler = (response) => {
    console.log('Login Success:', response);
    if (onSuccess) onSuccess(response);
  };

  const onFailureHandler = (error) => {
    console.error('Login Failed:', error);
    if (onFailure) onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccessHandler}
      onFailure={onFailureHandler}
      buttonText="Login with Google"
      redirectUri="http://localhost:3000"
      scopes={['profile', 'email']}
    />
  );
};

export default GoogleLoginButton;
