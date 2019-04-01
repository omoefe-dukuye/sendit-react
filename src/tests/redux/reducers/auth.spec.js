import authReducer from '../../../redux/reducers/auth';
import { ADD_PROFILE, REMOVE_PROFILE } from '../../../redux/actions/types';

test('Should return default state', () => {
  const defaultState = authReducer(undefined, { type: '@@INIT' });
  expect(defaultState).toEqual({});
});

test('Should handle add and remove profile', () => {
  let state = authReducer(undefined, {
    type: ADD_PROFILE,
    payload: {
      username: 'untethered'
    }
  });

  expect(state).toEqual({ user: { username: 'untethered' } });

  state = authReducer(undefined, { type: REMOVE_PROFILE });

  expect(state).toEqual({});
});

