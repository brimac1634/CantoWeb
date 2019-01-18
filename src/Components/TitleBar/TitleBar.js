import React from 'react';
import './TitleBar.css';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';

const TitleBar = ({ current, showSignIn }) => {
	return (
		<div className='title-bar'>
			<div className='slanted-div logo-div'></div>
			<Logo className='logo'/>
			<div className='slanted-div current-div'></div>
			<div className='current-container'>
				<h3 className='current'>{current}</h3>
				</div>
			<div className='button-container'>
				<button className='button' onClick={showSignIn}>
					<Icon icon='user-3' className='icon' width={22}/>
				</button>
				<button className='button'>
					<Icon icon='settings-6' className='icon' width={22}/>
				</button>
			</div>
		</div>
	);
}

export default TitleBar;