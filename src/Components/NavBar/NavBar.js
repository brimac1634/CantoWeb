import React from 'react';
import './NavBar.css';
import NavBarButton from './NavBarButton/NavBarButton';
import {icons} from '../../constants';

const NavBar = () => {
	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				<NavBarButton to={'/'} icon='search' title='Search'/> 
				<NavBarButton to={'/Favorites'} icon='like-2' title='Favorites'/> 
				<NavBarButton to={'/WordOfTheDay'} icon='calendar-7' title='Word of The Day'/> 
				<NavBarButton to={'/Learn'} icon='windows' title='Learn'/> 
			</div>
		</div>
	);
}

export default NavBar;