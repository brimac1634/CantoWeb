import React from 'react';
import './Settings.css';
import Logo from '../Logo/Logo';
import IconListItem from '../IconListItem/IconListItem';
import FullScreenPop from '../../Containers/FullScreenPop/FullScreenPop';
import FSPController from '../../Containers/FullScreenPop/FSPController';
import FSPTrigger from '../../Containers/FullScreenPop/FSPTrigger';
import DictionaryHelp from '../DictionaryHelp/DictionaryHelp';

const Settings = ({ userEmail, signInToggle, updateUser }) => {
	let userIsLoggedIn = false;
	if (userEmail != null) {
		userIsLoggedIn = true
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
					? <IconListItem icon='exit-1' title='Logout' handleClick={()=>updateUser('')}/>
					: <IconListItem icon='login' title='Sign In' handleClick={signInToggle}/>
				}
			</div>
		</div>
	);
		
}
export default Settings;
