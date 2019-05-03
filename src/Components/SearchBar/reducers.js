import { SET_TEMP_SEARCH } from './constants';

const initialState = {
	key: '',
}

export const setTempSearch = (state=initialState, action={}) => {
	switch (action.type) {
		case SET_TEMP_SEARCH:
			return Object.assign({}, state, {key: action.payload})
		default:
			return state
	}
}