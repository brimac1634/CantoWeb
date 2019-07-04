import { connectionError } from './helpers';
import Cookies from 'universal-cookie';

export default ({
	endPoint = '',
	method = 'GET',
	body,
	timeout = 20000
}) => {
    const cookies = new Cookies();
    const token = cookies.get('authToken')
    return Promise.race([fetch(`${process.env.REACT_APP_SERVER_URL}${endPoint}`, {
		method,
		headers: {
            'Content-Type': 'application/json',
            'x-access-token': token ? token : ''
        },
		body: JSON.stringify(body)
	}),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ])
    	.then(res => res.json())
    	.then(data => {
    		return data
    	})
    	.catch(err => {
    		connectionError()
    	})		
}