import { SET_TEMP_SEARCH, SET_SEARCH_TYPE } from './constants';

export const setTempSearch = (key) => ({
	type: SET_TEMP_SEARCH,
	payload: key
})

export const setSearchType = (type) => ({
	type: SET_SEARCH_TYPE,
	payload: type
})