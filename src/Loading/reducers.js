import { SET_LOADING } from './constants';

const initialState = {
	loading: true
} 

export const setLoading = (state=initialState, action={}) => {
	switch(action.type) {
		case SET_LOADING:
			return Object.assign({}, state, {loading: action.payload})
		default:
			return state;
	}
}