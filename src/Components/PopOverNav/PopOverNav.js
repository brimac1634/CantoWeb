import React from 'react';
import './PopOverNav.css';
import {Link} from 'react-router-dom';
import IconListItem from '../IconListItem/IconListItem';

const PopOverNav = () => {

	return (
		<div className='nav'>
			<Link to={'/'} className='link'>
				<IconListItem icon='search' title='Search'/>
			</Link>
			<Link to={'/Favorites'} className='link'>
				<IconListItem icon='like-2' title='Favorites'/>
			</Link>
			<Link to={'/WordOfTheDay'} className='link'>
				<IconListItem icon='calendar-7' title='Word Of The Day'/>
			</Link>
			<Link to={'/Learn'} className='link'>
				<IconListItem icon='windows' title='Learn'/>
			</Link>
		</div>
	);
		
}
export default PopOverNav;
