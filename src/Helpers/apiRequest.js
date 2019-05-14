import { connectionError } from './helpers';

export default ({
	endPoint = '',
	method = 'GET',
	headers = {'Content-Type': 'application/json'},
	body = {},
	timeout = 20000
}) => {
    return Promise.race([fetch(`https://cantotalk-server.herokuapp.com${endPoint}`, {
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