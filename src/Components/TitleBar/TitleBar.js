import React from 'react';
import './TitleBar.css';
import LogoFull from '../LogoFull/LogoFull';
import Icon from '../Icon/Icon';
import Controller from '../../Containers/PopOver/Controller';
import Trigger from '../../Containers/PopOver/Trigger';
import PopOver from '../../Containers/PopOver/PopOver';
import Settings from '../Settings/Settings';

const TitleBar = ({ current, signInToggle, userEmail, updateUser }) => {
	return (
		<div className='title-bar'>
			<div className='slanted-div logo-div'></div>
			<div className='title-logo-container'>
				<LogoFull className='title-logo'/>
			</div>
			<div className='slanted-div current-div'></div>
			<div className='current-container'>
				<h3 className='current'>{current}</h3>
			</div>
			<div className='button-container'>
				<Controller>
					<Trigger>
						<button className='button'>
							<Icon 
								icon='user-3' 
								className='icon' 
								width={26}
								color='cantoWhite'
							/>
						</button>
					</Trigger>
					<PopOver>
						<Settings 
							userEmail={userEmail} 
							signInToggle={signInToggle}
							updateUser={updateUser} 
						/>
					</PopOver>
				</Controller>
			</div>
		</div>
	);
}

export default TitleBar;