import { optionAlert } from '../components/option-alert/option-alert.component';
import { routes } from '../redux/routing/routing.constants';
import Cookies from 'universal-cookie';

export const validateUser = (userID) => {
	return userID != null && userID.toString().length
}

export const deleteToken = () => {
	const cookies = new Cookies();
    cookies.remove('authToken', { path: '/' });
}


export const isEmptyObject = (obj) => {
	return Object.entries(obj).length === 0
}

export const updateObject = (event, object) => {
	let newObject = object
	const { id } = event.target
    const { value } = event.target
    newObject[id] = value
    return newObject
}

export const setQueryURL = (key, type, hash) => {
	const { SEARCH } = routes;
	return `${SEARCH}?searchkey=${key}&searchtype=${type}${hash}` 
}

export const validateEmail = (email) => {
	const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regexp.test(email);
}

export const yyyymmdd = (date) => {
    const now = new Date(date);
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const mm = m < 10 ? '0' + m : m;
    const dd = d < 10 ? '0' + d : d;
    return '' + y + mm + dd;
}

export const requestToLogin = (confirm) => {
	optionAlert({
	    title: 'Please sign in.',
	    message: 'You must be signed in to access this capability. Would you like to sign in or register now?',
	    buttons: [
	      {
	        label: 'Yes',
	        onClick: ()=>confirm()
	      },
	      {
	        label: 'No',
	        onClick: null
	      }
	    ]
    })
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