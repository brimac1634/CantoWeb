import { PREV_ROUTE } from './routing.constants';
 
export const setPrevRoute = (route) => ({
	type: PREV_ROUTE,
	payload: route,
})