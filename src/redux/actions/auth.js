import axios from 'axios';
import { API } from '../../api';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // REGISTER_USER_REQUEST,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_FAIL,
  // AUTHENTICATE_USER_REQUEST,
  // AUTHENTICATE_USER_SUCCESS,
  // AUTHENTICATE_USER_FAIL,
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
    /* jshint ignore:start*/
    // eslint-disable-next-line valid-typeof
    if (typeof window !== undefined) {
      localStorage.setItem('jwt', JSON.stringify(data.token));
    }
    /* jshint ignore:end*/

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

// Register
// export const register = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: REGISTER_USER_REQUEST });

//     const config = { headers: { 'Content-Type': 'application/json' } };

//     const { data } = await axios.post(
//       `${API}/user/signup`,
//       { name, email, password },
//       config
//     );

//     dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({
//       type: REGISTER_USER_FAIL,
//       payload: 'Account already exists',
//     });
//   }
// };
