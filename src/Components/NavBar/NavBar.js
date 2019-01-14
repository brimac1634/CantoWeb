import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Icon from '../Icon/Icon';
import {icons} from '../../constants';

const NavBar = () => {
	return (
		<div className='nav-bar'>
			<div className='nav-list'>
				<Link to={'/'}><Icon icon={icons.search} title='Search'/></Link> 
				<Link to={'/Favorites'}><Icon icon={icons.heart} title='Favorites'/></Link>
				<Link to={'/WordOfTheDay'}><Icon icon={icons.calendar} title='Word of The Day'/></Link>
				<Link to={'/Learn'}><Icon icon={icons.rocket} title='Learn'/></Link>
			</div>
		</div>
	);
}

export default NavBar;