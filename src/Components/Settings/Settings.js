import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import Logo from '../Logo/Logo';
import IconListItem from '../IconListItem/IconListItem';
import DictionaryHelp from '../DictionaryHelp/DictionaryHelp';
import { routes } from '../../Routing/constants';
import {renderComponentAlert} from '../../Containers/ComponentAlert/ComponentAlert';
import { setUser } from '../../Containers/SignIn/actions';
import { setAlert } from '../../Components/PopUpAlert/actions';
import { setPrevRoute } from '../../Routing/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user,
		pathName: state.router.location.pathname,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(setUser(user)),
		presentAlert: (alert) => dispatch(setAlert(alert)),
		updateURL: (path) => dispatch(push(path)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
	}
}

const Settings = ({ user: { userEmail }, updateUser, presentAlert, closeOnClick, pathName, setPrevRoute, updateURL }) => {
	
	let userIsLoggedIn = false;
	if (userEmail != null && userEmail.length) {
		userIsLoggedIn = true
	}

	const { WHAT } = routes;

	const handleWhatIs = () => {
		updateURL(WHAT)
		closeOnClick()
	}

	const handleDictionaryHelp = () => {
		renderComponentAlert(DictionaryHelp)
		closeOnClick()
	}
	
	const handleContact = () => {
		console.log(789)
		closeOnClick()
	}

	const handleLogin = () => {
		const { LOGIN } = routes;
		setPrevRoute(pathName)
		updateURL(LOGIN)
		closeOnClick()
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
	    handleLogin()
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
					handleClick={handleWhatIs} 
				/>
				<IconListItem 
					icon='agenda' 
					title='Dictionary Help'
					handleClick={handleDictionaryHelp} 
				/>
				<IconListItem icon='paper-plane' title='Contact' handleClick={handleContact}/>
				<div className='list-divider'>&nbsp;</div>
				{userIsLoggedIn
					? <IconListItem 
						icon='exit-1' 
						title='Logout' 
						handleClick={handleLogout}
						/>
					: <IconListItem 
							icon='login' 
							title='Sign In'
							handleClick={handleLogin}
						/>
				}
			</div>
		</div>
	);
		
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
