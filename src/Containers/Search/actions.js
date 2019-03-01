import { TRIGGER_INV_DIV } from './constants';

export const setMobileEntry = (entryID) => ({
	type: TRIGGER_INV_DIV,
	payload: entryID
})