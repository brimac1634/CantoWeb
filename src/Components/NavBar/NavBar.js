import React from 'react';
import './NavBar.css';
import NavBarButton from './NavBarButton/NavBarButton';

const NavBar = ( {navChange} ) => {

	let sections = [
		{
			title: 'Search',
			to: '/',
			icon: 'search',
		},
		{
			title: 'Favorites',
			to: '/Favorites',
			icon: 'like-2',
		},
		{
			title: 'Word Of The Day',
			to: '/WordOfTheDay',
			icon: 'calendar-7',
		},
		{
			title: 'Learn',
			to: '/Learn',
			icon: 'windows',
		},
	]

	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				{sections.map(section => {
					return (
						<NavBarButton 
							key={section.title}
							to={section.to} 
							icon={section.icon} 
							title={section.title} 
							navChange={navChange}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default NavBar;