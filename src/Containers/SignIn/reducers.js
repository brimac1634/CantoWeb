import { UPDATE_USER } from './constants';

const initialState = {
	user: {
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