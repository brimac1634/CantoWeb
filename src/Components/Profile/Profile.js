import React from 'react';
import './Profile.css';
import Logo from '../Logo/Logo';

const Profile = ({ userEmail, signInToggle, updateUser }) => {
	let userIsLoggedIn = false;
	if (userEmail !== '' || userEmail != null) {
		console.log('im here')
		userIsLoggedIn = true
	}

	return (
		<div className='profile'>
			<div className='top-bar'>
				<Logo />
				<p>{userEmail}</p>
			</div>
			<div className='setting-list'>
				<button onClick={() => updateUser('')}>Logout</button>
				<button onClick={() => updateUser('')}>Logout</button>
			</div>
		</div>
	);
		
}
export default Profile;
