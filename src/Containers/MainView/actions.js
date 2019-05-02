import { SET_LOADING } from './constants';
 
export const setLoading = (loading) => ({
	type: SET_LOADING,
	payload: loading,
})