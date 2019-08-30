import React from 'react';
import './settings.styles.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import IconListItem from '../icon-list-item/icon-list-item.component';
import DictionaryHelp from '../dictionary-help/dictionary-help.component';
import { routes } from '../../redux/routing/routing.constants';
import {renderComponentAlert} from '../../components/component-alert/component-alert.component';
import { setUser } from '../../redux/sign-in/sign-in.actions';
import { setAlert } from '../../redux/pop-up-alert/pop-up-alert.actions';
import { setPrevRoute } from '../../redux/routing/routing.actions';
import { deleteToken } from '../../helpers/helpers';

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

const Settings = ({ user: { userName, userEmail }, updateUser, presentAlert, togglePopOver, pathName, setPrevRoute, updateURL }) => {
	
	const userIsLoggedIn = (userName != null && userName.length)
		? true
		: false

	const { WHAT, LOGIN, CONTACT, PROFILE, ADD } = routes;
	
	const handleProfile = () => {
		updateURL(PROFILE)
		togglePopOver()
	}

	const handleWhatIs = () => {
		updateURL(WHAT)
		togglePopOver()
	}

	const handleDictionaryHelp = () => {
		renderComponentAlert(DictionaryHelp)
		togglePopOver()
	}
	
	const handleContact = () => {
		setPrevRoute(pathName)
		updateURL(CONTACT)
		togglePopOver()
	}

	const handleLogin = () => {
		setPrevRoute(pathName)
		updateURL(LOGIN)
		togglePopOver()
	}

	const handleLogout = () => {
		setPrevRoute(pathName)
		updateUser('');
		deleteToken()

		const alert = {
	        title: 'Logout Successful',
	        message: 'You have successfully been logged out.',
	        showAlert: true,
	    }
	    presentAlert(alert);
	    handleLogin()
	}

	const handleAddEntry = () => {
		updateURL(ADD)
		togglePopOver()
	}

	return (
		<div className='settings'>
			<div className='setting-list'>
				{userIsLoggedIn 
					?   <IconListItem 
							icon='user-3' 
							title={userName}
							bold={true}
							handleClick={handleProfile} 
						/>
					:   <p className='welcome'>Welcome to CantoTalk!</p>
				}
				<div className='list-divider'>&nbsp;</div>
				<IconListItem 
					icon='agenda' 
					title='Dictionary Help'
					handleClick={handleDictionaryHelp} 
				/>
				<IconListItem 
					icon='info' 
					title='What is CantoTalk?'
					handleClick={handleWhatIs} 
				/>
				<IconListItem 
					icon='paper-plane' 
					title='Contact'
					handleClick={handleContact}
				/>
				{userEmail === 'brimac1634@gmail.com' &&
					<IconListItem 
						icon='add' 
						title='Add New Entry'
						handleClick={handleAddEntry}
					/>
				}
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
