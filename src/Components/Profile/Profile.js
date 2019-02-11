import React from 'react';
import './Profile.css';

const Profile = ({ userEmail, signInToggle, updateUser }) => {
	
	if (userEmail === '' || userEmail == null) {
		return (
			<div className='profile'>
				<h3>Welcome<br/> to CantoTalk</h3>
				<button className='ghost-btn' onClick={signInToggle}>Login</button>
			</div>
		);
	} else {
		return (
			<div className='profile'>
				<h3>Welcome<br/>  {`${userEmail}`}</h3>
				<button className='ghost-btn' onClick={() => updateUser('')}>Logout</button>
			</div>
		);
	}
}
export default Profile;
