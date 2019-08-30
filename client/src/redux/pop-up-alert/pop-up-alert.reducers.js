import { PRESENT_ALERT } from './pop-up-alert.constants';

const initialState = {
	alert: {
        title: '',
        message: '',
        showAlert: false,
        icon: '',
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