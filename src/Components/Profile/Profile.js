import React from 'react';
import './Profile.css';

const Profile = ({ userEmail, signInToggle }) => {
	const renderProfile = (email) => {
		console.log(email);
		if (email === '' || email === null) {
			return (
				<div className='profile'>
					<h1>Welcome to CantoTalk</h1>
					<button className='ghost-btn' onClick={console.log('login')}>Login</button>
					<button className='ghost-btn' onClick={console.log('register')}>Register</button>
				</div>
			);
		} else {
			return (
				<div className='profile'>
					<h1>{`Welcome ${userEmail}`}</h1>
					<button className='ghost-btn' onClick={console.log(123)}>Logout</button>
				</div>
			);
		}
	}

	return (
		renderProfile(userEmail)
	);
}
export default Profile;
