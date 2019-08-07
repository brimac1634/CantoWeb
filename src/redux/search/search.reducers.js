import { SET_MOBILE_ENTRY } from './search.constants';

const initialState = {
	mobileEntry: '',
}

export const setSearchState = (state=initialState, action={}) => {
	switch (action.type) {
		case SET_MOBILE_ENTRY:
			return Object.assign({}, state, {mobileEntry: action.payload})
		default:
			return state
	}
}