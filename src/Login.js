import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";

const clientId = "644150943784-dd4aaim7fuvgemorumocbbcgb4rmvdel.apps.googleusercontent.com";

gapi.load('client:auth2', () => {
  gapi.client.init({
      clientId: '644150943784-dd4aaim7fuvgemorumocbbcgb4rmvdel.apps.googleusercontent.com',
      plugin_name: "chat"
  })
})

const Login = () => {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}

export default Login;