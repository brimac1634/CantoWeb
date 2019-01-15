import React from 'react';
import './NavBar.css';
import NavBarButton from './NavBarButton/NavBarButton';
import {icons} from '../../constants';

const NavBar = () => {
	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				<NavBarButton to={'/'} icon={icons.search} title='Search'/> 
				<NavBarButton to={'/Favorites'} icon={icons.heart} title='Favorites'/> 
				<NavBarButton to={'/WordOfTheDay'} icon={icons.calendar} title='Word of The Day'/> 
				<NavBarButton to={'/Learn'} icon={icons.rocket} title='Learn'/> 
			</div>
		</div>
	);
}

export default NavBar;