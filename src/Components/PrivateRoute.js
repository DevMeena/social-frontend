import axios from 'axios';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = () => {
    if (typeof window === undefined) {
      return false;
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    } else {
      return false;
    }
  };

  const checkToken = async () => {
    const token = await isAuthenticated();
    axios
      .post('http://localhost:8000/user/authCheck', token, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  return isAuthenticated() && checkToken() ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
