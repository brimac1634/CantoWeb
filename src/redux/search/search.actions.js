import { SET_MOBILE_ENTRY } from './search.constants';

export const setMobileEntry = (entryID) => ({
	type: SET_MOBILE_ENTRY,
	payload: entryID
})