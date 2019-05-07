import { setLoading } from '../Loading/actions';
import { connectionError } from './helpers';

export default ({
	endPoint = '',
	method = 'GET',
	headers = {'Content-Type': 'application/json'},
	body = {},
	timeout = 20000
}) => {
	setLoading(true)
    return Promise.race([fetch(`http://localhost:3000${endPoint}`, {
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
    		setLoading(false)
    		return data
    	})
    	.catch(err => {
    		connectionError()
    		setLoading(false)
    	})		
}