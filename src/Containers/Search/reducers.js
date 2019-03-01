import { TRIGGER_INV_DIV } from './constants';

const initialState = {
	mobileEntry: '',
}

export const triggerInvDiv = (state=initialState, action={}) => {
	switch (action.type) {
		case TRIGGER_INV_DIV:
			return Object.assign({}, state, {mobileEntry: action.payload})
		default:
			return state
	}
}