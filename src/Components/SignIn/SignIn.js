import React from 'react';
import './SignIn.css';

const SignIn = () => {
	return (
		<div className='sign-in'>
			<div className='form-group'>
				<label>Email</label>
				<input className='input-field' type='email'/>
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input className='input-field' type='password'/>
			</div>
		</div>
	);
}

export default SignIn;