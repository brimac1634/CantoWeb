import { SET_TEMP_SEARCH, SET_SEARCH_TYPE } from './constants';

const initialState = {
	key: '',
	searchType: 'All'
}

export const setTempSearch = (state=initialState, action={}) => {
	switch (action.type) {
		case SET_TEMP_SEARCH:
			return Object.assign({}, state, {key: action.payload})
		case SET_SEARCH_TYPE:
			return Object.assign({}, state, {searchType: action.payload})
		default:
			return state
	}
}