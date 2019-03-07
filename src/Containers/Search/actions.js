import { TRIGGER_INV_DIV, SET_SEARCH_ROUTE } from './constants';

export const setMobileEntry = (entryID) => ({
	type: TRIGGER_INV_DIV,
	payload: entryID
})

export const setSearchRoute = (route) => ({
	type: SET_SEARCH_ROUTE,
	payload: route 
})