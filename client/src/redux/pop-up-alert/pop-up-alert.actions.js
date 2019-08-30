import { PRESENT_ALERT } from './pop-up-alert.constants';
 
export const setAlert = (alert) => ({
	type: PRESENT_ALERT,
	payload: alert,
})