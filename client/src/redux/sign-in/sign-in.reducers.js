import { UPDATE_USER } from './sign-in.constants';

const initialState = {
	user: {
		userName: '',
		userID: '',
        userEmail: '',
	}
} 

export const updateUser = (state=initialState, action={}) => {
	switch(action.type) {
		case UPDATE_USER:
			return Object.assign({}, state, {user: action.payload})
		default:
			return state;
	}
}