import React from 'react';
import './SignIn.css';
import Logo from '../Logo/Logo';

const SignIn = () => {
	return (
		<div className='shade-background'>
			<div className='sign-in-box'>
					<div className='logo-container'>
						<Logo />
					</div>
					<h2>Login</h2>
					<label>Email</label>
					<input className='sign-in-input input-field' type='email'/>
					<label>Password</label>
					<input className='sign-in-input input-field' type='password'/>
					<input className='btn' type='submit' value='Sign In'/>
					<p className='register'>Register</p>
			</div>
		</div>
	);
}

export default SignIn;