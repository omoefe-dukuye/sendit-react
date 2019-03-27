import { ADD_PROFILE, REMOVE_PROFILE } from './types';
import axios from '../../utils/axiosConfig';

const api = process.env.API_ROOT_URL;

export const addProfile = (user) => ({
  type: ADD_PROFILE,
  payload: user
});

export const removeProfile = () => ({
  type: REMOVE_PROFILE,
});

export const login = loginDetails => async (dispatch) => {
  try {
    const { data: { token, user } } = await axios.post(`${api}/auth/login`, loginDetails);

    localStorage.setItem('token', token);

    user.userFirstName = user['first_name'];

    dispatch(addProfile(user));
    return;

  } catch ({ response: { data: { error } } }) {
    return error;
  }
};

export const signup = signupDetails => async (dispatch) => {
  try {
    const { data: { token, user } } = await axios.post(`${api}/auth/signup`, signupDetails);

    localStorage.setItem('token', token);

    user.userFirstName = user['first_name'];

    dispatch(addProfile(user));
    return;

  } catch ({ response: { data: { error } } }) {
    return error;
  }
};
