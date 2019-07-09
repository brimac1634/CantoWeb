import { connectionError } from './helpers';
import Cookies from 'universal-cookie';
import { optionAlert } from '../Containers/OptionAlert/OptionAlert';

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
		body: body ? JSON.stringify(body) : undefined
	}),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ])
    	.then(res => res.json())
    	.then(data => {
            if (data && data.error != null) {
                const { title, message } = data.error;
                optionAlert({
                    title,
                    message
                })
            }
    		return data
    	})
    	.catch(() => connectionError())		
}