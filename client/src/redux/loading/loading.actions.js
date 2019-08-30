import { SET_LOADING } from './loading.constants';
 
export const setLoading = (loading) => ({
	type: SET_LOADING,
	payload: loading,
})