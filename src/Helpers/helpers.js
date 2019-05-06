import { optionAlert } from '../Containers/OptionAlert/OptionAlert';
import { routes } from '../Routing/constants';

export const validateUser = (userID) => {
	return userID != null && userID.toString().length
}

export const setQueryURL = (key, hash) => {
	const { SEARCH } = routes;
	return `${SEARCH}?searchkey=${key}${hash}` 
}

export const connectionError = () => {
	optionAlert({
	    title: 'Connection Error',
	    message: 'There appears to be an issue with the connection. Please check back shortly.',
    })
}

export const serverError = () => {
	optionAlert({
	    title: 'Server Issue',
	    message: 'There appears to be an issue with our server. Please check back shortly.',
    })
}