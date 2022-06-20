import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginCall } from './apiCalls';
import { AuthContext } from '../context/AuthContext';
const clientId =
  '644150943784-dd4aaim7fuvgemorumocbbcgb4rmvdel.apps.googleusercontent.com';

gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId:
      '644150943784-dd4aaim7fuvgemorumocbbcgb4rmvdel.apps.googleusercontent.com',
    plugin_name: 'chat',
  });
});

const GoogleAuth = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const onLoginSuccess = (res) => {
    googleLoginCall(res.tokenId, dispatch);
  };

  const { error, dispatch } = useContext(AuthContext);

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  useEffect(() => {
    if (error) {
      toast.error('unable to log in!');
    }
  }, [error]);

  return (
    <div>
      <ToastContainer />

      {showloginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText='Use Google Account instead?'
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText='Sign Out'
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
};

export default GoogleAuth;
