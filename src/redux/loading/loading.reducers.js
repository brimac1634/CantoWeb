import { SET_LOADING } from './loading.constants';

const initialState = {
	loading: false
} 

export const setLoading = (state=initialState, action={}) => {
	switch(action.type) {
		case SET_LOADING:
			return Object.assign({}, state, {loading: action.payload})
		default:
			return state;
	}
}