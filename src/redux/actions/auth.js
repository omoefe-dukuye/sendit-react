import { ADD_PROFILE } from './types';
import axios from '../../utils/axiosConfig';

const api = process.env.API_ROOT_URL;

export const addProfile = (user) => ({
  type: ADD_PROFILE,
  payload: user
});

export const login = loginDetails => async (dispatch) => {
  try {
    const { data: { token, user } } = await axios.post(`${api}/users/login`, loginDetails);

    localStorage.setItem('token', token);

    dispatch(addProfile(user));
    return;

  } catch ({ response: { status } }) {
    switch (status) {
      case 401:
        return 'Incorrect username or password.';

      case 500:
      case 502:
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};
