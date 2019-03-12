import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';
import Logo from '../Logo/Logo';
import IconListItem from '../IconListItem/IconListItem';
import FullScreenPop from '../../Containers/FullScreenPop/FullScreenPop';
import FSPController from '../../Containers/FullScreenPop/FSPController';
import FSPTrigger from '../../Containers/FullScreenPop/FSPTrigger';
import DictionaryHelp from '../DictionaryHelp/DictionaryHelp';
import WhatIsCantoTalk from '../WhatIsCantoTalk/WhatIsCantoTalk';
import SignIn from '../../Containers/SignIn/SignIn';
import {renderComponentAlert} from '../../Containers/ComponentAlert/ComponentAlert';
import { setUser } from '../../Containers/SignIn/actions';
import { setAlert } from '../../Components/PopUpAlert/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(setUser(user)),
		presentAlert: (alert) => dispatch(setAlert(alert)),
	}
}

const Settings = ({ user: { userEmail }, updateUser, presentAlert }) => {
	let userIsLoggedIn = false;
	if (userEmail != null && userEmail.length) {
		userIsLoggedIn = true
	}
	
	const handleContact = () => {
		console.log(789)
	}

	const handleLogout = () => {
		updateUser('');
		localStorage.setItem('user', '');
		const alert = {
	        title: 'Logout Successful',
	        message: 'You have successfully been logged out.',
	        showAlert: true,
	    }
	    presentAlert(alert);
	}

	return (
		<div className='settings'>
			<div className='logo-bar'>
				<Logo iconSize='50px' />
			</div>
			{userIsLoggedIn 
					? <p className='welcome'>{userEmail}</p> 
					: <p className='welcome'>Welcome to CantoTalk!</p>
				}
			<div className='list-divider'>&nbsp;</div>
			<div className='setting-list'>
				<IconListItem 
					icon='info' 
					title='What is CantoTalk?'
					handleClick={()=>renderComponentAlert(WhatIsCantoTalk)} 
				/>
				<IconListItem 
					icon='agenda' 
					title='Dictionary Help'
					handleClick={()=>renderComponentAlert(DictionaryHelp)} 
				/>
				<IconListItem icon='paper-plane' title='Contact' handleClick={handleContact}/>
				<div className='list-divider'>&nbsp;</div>
				{userIsLoggedIn
					? <IconListItem icon='exit-1' title='Logout' handleClick={handleLogout}/>
					: <IconListItem 
							icon='login' 
							title='Sign In'
							handleClick={()=>renderComponentAlert(SignIn)}
						/>
				}
			</div>
		</div>
	);
		
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
