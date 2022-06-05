import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const onLoginSuccess = (res) => {
    setRedirect(false);
    console.log('Login Success:', res.profileObj);
    axios({
      method: 'POST',
      url: 'http://localhost:8000/user/googlelogin',
      data: { tokenId: res.tokenId },
    })
      .then((response) => {
        console.log('Google login successful', response);
        // authenticate
        if (typeof window !== undefined) {
          localStorage.setItem('jwt', JSON.stringify(response.data.token));
        }
        setRedirect(true);
      })
      .catch((e) => {
        console.log(e);
      });
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

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
    if (redirect) {
      navigate('/home');
    }
  }, [redirect]);

  return (
    <div>
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
