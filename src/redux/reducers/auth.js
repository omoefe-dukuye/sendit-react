import { ADD_PROFILE } from '../actions/types';

const authReducerDefaultState = {}

export default (state = authReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_PROFILE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
