import React from 'react';
import './nav-menu.styles.css';
import navSections from './nav-menu.data';
import {Link} from 'react-router-dom';
import IconListItem from '../icon-list-item/icon-list-item.component';

const NavMenu = ({ togglePopOver }) => {

	return (
		<div className='nav'>
			{
				navSections.map(section => {
					const { title, to, icon } = section;

					return(
						<div key={title} className='link' onClick={togglePopOver}>
							<Link to={to} className='link'>
								<IconListItem icon={icon} title={title}/>
							</Link>
						</div>
					);
				})

			}
		</div>
	);
		
}
export default NavMenu;
