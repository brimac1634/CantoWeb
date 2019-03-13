import { TRIGGER_INV_DIV, SET_SEARCH_ROUTE, SET_SEARCH_KEY } from './constants';

const initialState = {
	mobileEntry: '',
	route: '',
	searchKey: '',
}

export const setSearchState = (state=initialState, action={}) => {
	switch (action.type) {
		case TRIGGER_INV_DIV:
			return Object.assign({}, state, {mobileEntry: action.payload})
		case SET_SEARCH_ROUTE:
			return Object.assign({}, state, {route: action.payload})
		case SET_SEARCH_KEY:
			return Object.assign({}, state, {searchKey: action.payload})
		default:
			return state
	}
}