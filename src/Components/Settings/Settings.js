import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';
import Logo from '../Logo/Logo';
import IconListItem from '../IconListItem/IconListItem';
import FullScreenPop from '../../Containers/FullScreenPop/FullScreenPop';
import FSPController from '../../Containers/FullScreenPop/FSPController';
import FSPTrigger from '../../Containers/FullScreenPop/FSPTrigger';
import DictionaryHelp from '../DictionaryHelp/DictionaryHelp';
import SignIn from '../../Containers/SignIn/SignIn';
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

	const handleHelp = () => {
		console.log(456)
	}
	
	const handleContact = () => {
		console.log(789)
	}

	const handleLogout = () => {
		updateUser('');
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
				<div className='settings-item'>
					<FSPController>
						<FSPTrigger>
							<IconListItem 
								icon='info' 
								title='What is CantoTalk?'
							/>
						</FSPTrigger>
						<FullScreenPop>
							<DictionaryHelp />
						</FullScreenPop>
					</FSPController>
				</div>
				<IconListItem icon='agenda' title='Dictionary Help' handleClick={handleHelp}/>
				<IconListItem icon='paper-plane' title='Contact' handleClick={handleContact}/>
				<div className='list-divider'>&nbsp;</div>
				{userIsLoggedIn
					? <IconListItem icon='exit-1' title='Logout' handleClick={handleLogout}/>
					: <FSPController>
						<FSPTrigger>
							<IconListItem 
								icon='login' 
								title='Sign In'
							/>
						</FSPTrigger>
						<FullScreenPop>
							<SignIn />
						</FullScreenPop>
					  </FSPController>
				}
			</div>
		</div>
	);
		
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
