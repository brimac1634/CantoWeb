import React from 'react';
import './NavBarButton.css'
import {Link} from 'react-router-dom';
import Icon from '../../Icon/Icon';


const NavBarButton = ({ to, navChange, title, icon, buttonStatus, selectButton, isSelected }) => {

	let buttonStyle = ''
	let color = ''
	if (isSelected) {
		buttonStyle = 'selected-nav-button'
		color = '#ff7a8a'
	}

	return (
		<div className={`nav-button-container ${buttonStyle}`} onClick={()=>selectButton(title)}>
			<Link to={to} className='nav-bar-button'>
				<Icon 
					icon={icon} 
					className='icon-button' 
					title={title}
					iconStyle={buttonStatus}
					color={color}
				/>
			</Link>
		</div>
	);
}

export default NavBarButton;