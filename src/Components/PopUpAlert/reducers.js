import { PRESENT_ALERT } from './constants';

const initialState = {
	alert: {
        title: '',
        message: '',
        showAlert: false,
    }
}

export const presentAlert = (state=initialState, action={}) => {
	switch (action.type) {
		case PRESENT_ALERT:
			return Object.assign({}, state, {alert: action.payload})
		default:
			return state
	}
}