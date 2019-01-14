import React from 'react';
import './TitleBar.css';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import {icons} from '../../constants';

const TitleBar = () => {
	return (
		<div className='title-bar'>
			<Logo />
			<div className='button-container'>
				<Icon icon={icons.profile} className='icon' width={22}/>
				<Icon icon={icons.settings} className='icon' width={22}/>
			</div>
		</div>
	);
}

export default TitleBar;