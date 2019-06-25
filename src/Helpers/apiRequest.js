import { connectionError } from './helpers';

export default ({
	endPoint = '',
	method = 'GET',
	headers = {'Content-Type': 'application/json'},
	body,
	timeout = 20000
}) => {
    // ${process.env.REACT_APP_SERVER_URL}
    // http://localhost:3000
    return Promise.race([fetch(`${process.env.REACT_APP_SERVER_URL}${endPoint}`, {
		method,
		headers,
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