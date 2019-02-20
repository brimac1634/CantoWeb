import React from 'react';
import './Settings.css';
import Logo from '../Logo/Logo';
import IconListItem from '../IconListItem/IconListItem';

const Settings = ({ userEmail, signInToggle, updateUser }) => {
	let userIsLoggedIn = false;
	if (userEmail != null) {
		userIsLoggedIn = true
	}

	const handleInfo = () => {
		console.log(123);
	}

	const handleHelp = () => {
		console.log(456)
	}
	
	const handleContact = () => {
		console.log(789)
	}

	return (
		<div className='settings'>
			<div className='top-bar'>
				<Logo />
				{userIsLoggedIn 
					? <p>{userEmail}</p> 
					: <h4>Welcome to CantoTalk!</h4>
				}
			</div>
			<div className='list-divider'>&nbsp;</div>
			<div className='setting-list'>
				<IconListItem icon='info' title='What is CantoTalk?' handleClick={handleInfo}/>
				<IconListItem icon='agenda' title='Dictionary Help' handleClick={handleHelp}/>
				<IconListItem icon='paper-plane' title='Contact' handleClick={handleContact}/>
				<div className='list-divider'>&nbsp;</div>
				{userIsLoggedIn
					? <IconListItem icon='exit-1' title='Logout' handleClick={()=>updateUser('')}/>
					: <IconListItem icon='login' title='Sign In' handleClick={signInToggle}/>
				}
			</div>
		</div>
	);
		
}
export default Settings;
