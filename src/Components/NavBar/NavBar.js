import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Icon from '../Icon/Icon';
import {icons} from '../../constants';

const NavBar = () => {
	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				<Link to={'/'} className='icon-button'><Icon icon={icons.search} className='icon-button' title='Search'/></Link> 
				<Link to={'/Favorites'} className='icon-button'><Icon icon={icons.heart} className='icon-button' title='Favorites'/></Link>
				<Link to={'/WordOfTheDay'} className='icon-button'><Icon icon={icons.calendar} className='icon-button' title='Word of The Day'/></Link>
				<Link to={'/Learn'} className='icon-button'><Icon icon={icons.rocket} title='Learn'/></Link>
			</div>
		</div>
	);
}

export default NavBar;