import axios from 'axios';
import { API } from '../api';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAIL,
  // CLEAR_ERRORS,
} from '../constants/auth';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `${API}/user/login`,
      { email, password },
      config
    );
    // authenticate
    if (typeof window !== undefined) {
      localStorage.setItem('jwt', JSON.stringify(data.token));
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `${API}/user/signup`,
      { name, email, password },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const authenticate = (token) => async (dispatch) => {
  try {
    dispatch({ type: AUTHENTICATE_USER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(`${API}/authenticate`, { token }, config);

    dispatch({ type: AUTHENTICATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: AUTHENTICATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
