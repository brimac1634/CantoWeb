import { UPDATE_USER } from './sign-in.constants';
 
export const setUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
})