import { SET_TEMP_SEARCH } from './constants';

export const setTempSearch = (key) => ({
	type: SET_TEMP_SEARCH,
	payload: key
})