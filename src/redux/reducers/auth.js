import { ADD_PROFILE, REMOVE_PROFILE } from '../actions/types';

const authReducerDefaultState = {}

export default (state = authReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_PROFILE:
      return { ...state, user: action.payload };

    case REMOVE_PROFILE:
      return {};

    default:
      return state;
  }
};
