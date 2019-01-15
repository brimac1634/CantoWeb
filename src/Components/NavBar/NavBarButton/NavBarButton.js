import React from 'react';
import './NavBarButton.css'
import {Link} from 'react-router-dom';
import Icon from '../../Icon/Icon';


const NavBarButton = (props) => {
	return (
		<div className='nav-button-container'>
			<Link to={props.to} className='nav-bar-button' onClick={props.navChange(props.title)}>
				<Icon icon={props.icon} className='icon-button' title={props.title}/>
			</Link>
		</div>
	);
}

export default NavBarButton;