import axios from 'axios';
import { API } from '../api';

export const loginCall = async (email, password, dispatch) => {
  console.log('I AM CALLED');

  dispatch({ type: 'LOGIN_START' });
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    console.log(email, password);
    const res = await axios.post(
      `${API}/user/login`,
      { email, password },
      config
    );
    console.log('this is my response', res.data);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};

export const googleLoginCall = async (tokenId, dispatch) => {
  console.log('GOOGLE IS CALLED');

  dispatch({ type: 'LOGIN_START' });
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const res = await axios.post(
      `${API}/user/googlelogin`,
      { tokenId },
      config
    );

    console.log('this is my response', res.data);

    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};

export const logoutCall = (dispatch) => {
  dispatch({ type: 'LOGOUT_START' });
  try {
    // eslint-disable-next-line valid-typeof
    if (typeof window !== undefined) {
      localStorage.removeItem('user');
    }
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'LOGOUT_FAILURE' });
  }
};
