import React from 'react';
import './Profile.css';
import Logo from '../Logo/Logo';
import IconList from '../IconList/IconList';

const Profile = ({ userEmail, signInToggle, updateUser }) => {
	let userIsLoggedIn = false;
	if (userEmail != null) {
		userIsLoggedIn = true
	}

	const handleWhatIs = () => {
		console.log(123);
	}

	const items = [
		{
			icon: 'info',
			title: 'What is CantoTalk?',
			handleClick: handleWhatIs
		},
		{
			icon: 'internet',
			title: 'Where is the internet',
			handleClick: handleWhatIs
		}
	]

	return (
		<div className='profile'>
			<div className='top-bar'>
				<Logo />
				{userIsLoggedIn 
					? <p>{userEmail}</p> 
					: <h4>Welcome to CantoTalk!</h4>
				}
			</div>
			<div className='setting-list'>
				<IconList title='stuff' items={items}/>
			</div>
		</div>
	);
		
}
export default Profile;
