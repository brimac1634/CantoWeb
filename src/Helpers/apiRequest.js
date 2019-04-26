export default ({
	endPoint = '',
	method = 'GET',
	headers = {'Content-Type': 'application/json'},
	body = {}
}) => {
  	return fetch(`http://localhost:3000${endPoint}`, {
		method,
		headers,
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.then(data => {
		return data
	})
	.catch(err => console.log(err))
}