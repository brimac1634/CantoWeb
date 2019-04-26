import { SET_MOBILE_ENTRY, SET_SEARCH_KEY } from './constants';

export const setMobileEntry = (entryID) => ({
	type: SET_MOBILE_ENTRY,
	payload: entryID
})

export const setSearchKey = (searchKey) => ({
	type: SET_SEARCH_KEY,
	payload: searchKey
})