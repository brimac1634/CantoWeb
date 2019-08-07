import { PREV_ROUTE } from './routing.constants';

const initialState = {
	route: ''
} 

export const setPrevRoute = (state=initialState, action={}) => {
	switch(action.type) {
		case PREV_ROUTE:
			return Object.assign({}, state, {route: action.payload})
		default:
			return state;
	}
}