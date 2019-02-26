import { UPDATE_USER } from './constants';

export const setUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
})