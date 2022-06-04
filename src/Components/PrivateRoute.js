import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../actions/auth';

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

const PrivateRoute = () => {
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated());
  const token = isAuthenticated();
  const dispatch = useDispatch();
  //   && dispatch(authenticate(token))
  return isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
