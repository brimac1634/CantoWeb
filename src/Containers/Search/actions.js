import { SET_MOBILE_ENTRY } from './constants';

export const setMobileEntry = (entryID) => ({
	type: SET_MOBILE_ENTRY,
	payload: entryID
})