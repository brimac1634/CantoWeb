import React from 'react';
import './NavBarButton.css'
import {Link} from 'react-router-dom';
import Icon from '../../../Components/Icon/Icon';


const NavBarButton = ({ to, title, icon, buttonStatus, isSelected }) => {

	let buttonStyle = ''
	let color = 'cantoWhite'
	if (isSelected) {
		buttonStyle = 'selected-nav-button'
		color = 'cantoPink'
	}

	return (
		<div className={`nav-button-container ${buttonStyle}`} >
			<Link to={to} className='nav-bar-button'>
				<Icon 
					icon={icon} 
					className='icon-button' 
					title={title}
					iconSize='20'
					color={color}
				/>
			</Link>
		</div>
	);
}

export default NavBarButton;