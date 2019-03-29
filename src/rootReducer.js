import { combineReducers } from 'redux';
import {updateUser} from './Containers/SignIn/reducers';
import {presentAlert} from './Components/PopUpAlert/reducers';
import {setSearchState} from './Containers/Search/reducers';

export const rootReducer = combineReducers({
	user: updateUser,
	alert: presentAlert,
	search: setSearchState
})