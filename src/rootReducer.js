import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import {updateUser} from './redux/sign-in/sign-in.reducers';
import {presentAlert} from './redux/pop-up-alert/pop-up-alert.reducers';
import {setSearchState} from './redux/search/search.reducers';
import {setPrevRoute} from './redux/routing/routing.reducers';
import {setLoading} from './redux/loading/loading.reducers';
import {setTempSearch} from './redux/search-bar/search-bar.reducers';
import {setDeck} from './redux/deck-view/deck-view.reducers';

export default history => combineReducers({
	router: connectRouter(history),
	user: updateUser,
	alert: presentAlert,
	search: setSearchState,
	prevRoute: setPrevRoute,
	loading: setLoading,
	temp: setTempSearch,
	deck: setDeck,
})