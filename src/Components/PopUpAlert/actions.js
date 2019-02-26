import { PRESENT_ALERT } from './constants';
 
export const presentAlert = (alert) => ({
	type: PRESENT_ALERT,
	payload: alert,
})