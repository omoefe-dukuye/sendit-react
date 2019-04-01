import parcelsReducer from '../../../redux/reducers/parcels';
import { ADD_ORDER } from '../../../redux/actions/types';

test('Should return default state', () => {
  const defaultState = parcelsReducer(undefined, { type: '@@INIT' });
  expect(defaultState).toEqual([]);
});

test('Should handle add parcel', () => {
  let state = parcelsReducer(undefined, {
    type: ADD_ORDER,
    payload: { id: 3, location: 'Obalende' }
  });

  expect(state).toEqual([{ id: 3, location: 'Obalende' }]);
});

