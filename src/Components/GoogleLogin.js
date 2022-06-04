import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './style.css';
import axios from 'axios';

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
    console.log('Login Success:', res.profileObj);
    axios({
      method: "POST",
      url: "http://localhost:8000/user/googlelogin",
      data: {tokenId: res.tokenId}
    }).then((response) => {
      console.log('Google login successful',response);
    }).catch(e=> {
      console.log(e);
    })
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

  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText='Sign In'
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
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
