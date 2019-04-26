import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import {updateUser} from './Containers/SignIn/reducers';
import {presentAlert} from './Components/PopUpAlert/reducers';
import {setSearchState} from './Containers/Search/reducers';
import {setPrevRoute} from './Routing/reducers';

export default history => combineReducers({
	router: connectRouter(history),
	user: updateUser,
	alert: presentAlert,
	search: setSearchState,
	prevRoute: setPrevRoute
})