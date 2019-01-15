import React from 'react';
import './NavBar.css';
import NavBarButton from './NavBarButton/NavBarButton';

const NavBar = ( {navChange} ) => {
	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				<NavBarButton to={'/'} icon='search' title='Search' navChange={navChange}/> 
				<NavBarButton to={'/Favorites'} icon='like-2' title='Favorites' navChange={navChange}/> 
				<NavBarButton to={'/WordOfTheDay'} icon='calendar-7' title='Word of The Day' navChange={navChange}/> 
				<NavBarButton to={'/Learn'} icon='windows' title='Learn' navChange={navChange}/> 
			</div>
		</div>
	);
}

export default NavBar;