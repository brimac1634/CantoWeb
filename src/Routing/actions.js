import { PREV_ROUTE } from './constants';
 
export const setPrevRoute = (route) => ({
	type: PREV_ROUTE,
	payload: route,
})