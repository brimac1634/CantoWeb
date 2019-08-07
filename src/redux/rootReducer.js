import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import {updateUser} from './sign-in/sign-in.reducers';
import {presentAlert} from './pop-up-alert/pop-up-alert.reducers';
import {setSearchState} from './search/search.reducers';
import {setPrevRoute} from './routing/routing.reducers';
import {setLoading} from './loading/loading.reducers';
import {setTempSearch} from './search-bar/search-bar.reducers';
import {setDeck} from './deck-view/deck-view.reducers';

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