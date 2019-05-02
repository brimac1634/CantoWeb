import { optionAlert } from '../Containers/OptionAlert/OptionAlert';

export const validateUser = (userID) => {
	return userID != null && userID.toString().length
}

export const serverError = () => {
	optionAlert({
	    title: 'Server Issue',
	    message: 'There appears to be an issue with our server. Please check back shortly.',
    })
}