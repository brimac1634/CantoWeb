import React from 'react';
import './NavBarButton.css'
import {Link} from 'react-router-dom';
import Icon from '../../Icon/Icon';


const NavBarButton = (props) => {
	return (
		<div className='nav-button-container' onClick={()=>props.navChange(props.title)}>
			<Link to={props.to} className='nav-bar-button'>
				<Icon icon={props.icon} className='icon-button' title={props.title}/>
			</Link>
		</div>
	);
}

export default NavBarButton;