import { UPDATE_USER } from './constants';

const initialState = {
	user: {
		id: '',
        email: '',
	},
	alert: {
        title: '',
        message: '',
        showAlert: false,
    },
}

export const updateUser = (state=initialState, action={}) => {
	switch(action.type) {
		case UPDATE_USER:
			return Object.assign({}, state, {user: action.payload})
		default:
			return state;
	}
}