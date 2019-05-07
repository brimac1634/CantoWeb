import React from 'react';
import './PopOverNav.css';
import navSections from '../navSections';
import {Link} from 'react-router-dom';
import IconListItem from '../../../Components/IconListItem/IconListItem';

const PopOverNav = ({ closeOnClick }) => {

	const handlePopOver = () => {
		closeOnClick()
	}

	return (
		<div className='nav'>
			{
				navSections.map(section => {
					const { title, to, icon } = section;

					return(
						<div key={title} className='link' onClick={handlePopOver}>
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
export default PopOverNav;
