import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@babel/polyfill';
import axios from '../../../utils/axiosConfig';
import { addProfile, removeProfile, login, signup } from '../../../redux/actions/auth';
import { REMOVE_PROFILE, ADD_PROFILE } from '../../../redux/actions/types';


const createMockStore = configureMockStore([thunk]);
jest.mock('../../../utils/axiosConfig');

test('Should add profile', () => {
  const store = createMockStore({});
  store.dispatch(addProfile({ username: 'untethered' }));

  const [action] = store.getActions();

  expect(action).toEqual({
    payload: {
      username: 'untethered'
    },
    type: ADD_PROFILE
  });
})

test('Should remove profile', () => {
  const store = createMockStore({});
  store.dispatch(removeProfile());

  const [action] = store.getActions();

  expect(action).toEqual({
    type: REMOVE_PROFILE
  });
})


test('Should log in user', async () => {
  axios.post.mockResolvedValue({
    data: {
      token: 'token',
      user: {
        id: 2
      }
    }
  });


  const store = createMockStore({});
  await store.dispatch(login({ username: 'untethered', password: 'password' }));

  const [action] = store.getActions();

  expect(action).toEqual({
    payload: {
      id: 2,
      userFirstName: undefined,
    },
    type: ADD_PROFILE
  });
});

test('Should handle login errors', async() => {
  axios.post.mockRejectedValue({
    response: {
      data: {
        error: 2
      }
    }
  });


  const store = createMockStore({});
  await store.dispatch(login({ username: 'untethered', password: 'password' }));

  const [action] = store.getActions();

  expect(action).toEqual(undefined);
});

test('Should sign up user', async () => {
  axios.post.mockResolvedValue({
    data: {
      token: 'token',
      user: {
        id: 2
      }
    }
  });


  const store = createMockStore({});
  await store.dispatch(signup({ username: 'untethered', password: 'password' }));

  const [action] = store.getActions();

  expect(action).toEqual({
    payload: {
      id: 2,
      userFirstName: undefined,
    },
    type: ADD_PROFILE
  });
});

test('Should handle signup errors', async() => {
  axios.post.mockRejectedValue({
    response: {
      data: {
        error: 2
      }
    }
  });

  const store = createMockStore({});
  await store.dispatch(signup({ username: 'untethered', password: 'password' }));

  const [action] = store.getActions();

  expect(action).toEqual(undefined);
});
