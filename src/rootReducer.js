import { combineReducers } from 'redux';
import {updateUser} from './Containers/SignIn/reducers';
import {presentAlert} from './Components/PopUpAlert/reducers';

export const rootReducer = combineReducers({
	user: updateUser,
	alert: presentAlert,
})