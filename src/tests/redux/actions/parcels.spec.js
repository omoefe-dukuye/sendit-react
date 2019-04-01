import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@babel/polyfill';
import axios from '../../../utils/axiosConfig';
import { createOrder } from '../../../redux/actions/parcels';
import { ADD_ORDER } from '../../../redux/actions/types';


const createMockStore = configureMockStore([thunk]);
jest.mock('../../../utils/axiosConfig');

test('Should sign up user', async () => {
  axios.post.mockResolvedValue({
    data: {
      parcel: {
        id: 2
      }
    }
  });


  const store = createMockStore({});
  await store.dispatch(createOrder({ username: 'untethered', password: 'password' }));

  const [action] = store.getActions();

  expect(action).toEqual({
    payload: {
      id: 2,
      userFirstName: undefined,
    },
    type: ADD_ORDER
  });
});
