import { TRIGGER_INV_DIV, SET_SEARCH_KEY } from './constants';

export const setMobileEntry = (entryID) => ({
	type: TRIGGER_INV_DIV,
	payload: entryID
})

export const setSearchKey = (searchKey) => ({
	type: SET_SEARCH_KEY,
	payload: searchKey
})