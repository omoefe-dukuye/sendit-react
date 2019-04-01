import { ADD_ORDER } from '../actions/types';

const parcelReducerDefaultState = [];

export default (state = parcelReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_ORDER:
      return [...state, action.payload];

    default:
      return state;
  }
};
