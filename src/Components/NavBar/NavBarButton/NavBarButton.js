import React from 'react';
import './NavBarButton.css'
import {Link} from 'react-router-dom';
import Icon from '../../Icon/Icon';


const NavBarButton = ({ to, navChange, title, icon, buttonStatus }) => {

	return (
		<div className='nav-button-container' onClick={()=>navChange(title)}>
			<Link to={to} className='nav-bar-button'>
				<Icon 
					icon={icon} 
					className='icon-button' 
					title={title}
					iconStyle={buttonStatus}
				/>
			</Link>
		</div>
	);
}

export default NavBarButton;