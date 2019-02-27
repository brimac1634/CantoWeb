import { PRESENT_ALERT } from './constants';
 
export const setAlert = (alert) => ({
	type: PRESENT_ALERT,
	payload: alert,
})