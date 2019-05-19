import { connectionError } from './helpers';

export default ({
	endPoint = '',
	method = 'GET',
	headers = {'Content-Type': 'application/json'},
	body = {},
	timeout = 20000
}) => {
    // process.env.SERVER
    // https://cantotalk-server.herokuapp.com
    return Promise.race([fetch(`${process.env.SERVER}${endPoint}`, {
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