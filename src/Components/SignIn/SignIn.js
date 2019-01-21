import React from 'react';
import './SignIn.css';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';

const SignIn = ({ signInToggle, title, signInButton, alternateButton }) => {


	return (
		<div className='shade-background animate-fade-in'>
			<div className='sign-in-box animate-pop-in'>
				<button className='close' onClick={() => signInToggle('home')}>
					<Icon 
						icon='multiply' 
						iconStyle='dark' 
						width='15'
					/>
				</button>
				<div className='sign-in-container'>
					<div className='logo-container'>
						<Logo />
					</div>
					<h2>{title}</h2>
					<label>Email</label>
					<input className='sign-in-input input-field' type='email'/>
					<label>Password</label>
					<input className='sign-in-input input-field' type='password'/>
					<input className='btn' type='submit' value={signInButton}/>
					<p className='register' onClick={() => signInToggle(alternateButton)}>{alternateButton}</p>
				</div>
			</div>
		</div>
	);
}

export default SignIn;