import { combineReducers } from 'redux';
import authReducer from './auth';
import parcelsReducer from './parcels';

export default combineReducers({
	auth: authReducer,
	parcels: parcelsReducer
});
