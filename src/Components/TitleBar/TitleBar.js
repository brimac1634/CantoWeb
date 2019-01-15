import React from 'react';
import './TitleBar.css';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import {icons} from '../../constants';

const TitleBar = props => {
	return (
		<div className='title-bar'>
			<div className='slanted-div logo-div'></div>
			<Logo className='logo'/>
			<div className='slanted-div current-div'></div>
			<h3 className='current'>{props.current}</h3>
			<div className='button-container'>
				<Icon icon={icons.profile} className='icon' width={22}/>
				<Icon icon={icons.settings} className='icon' width={22}/>
			</div>
		</div>
	);
}

export default TitleBar;