import React from 'react';
import './PopOverNav.css';
import navSections from '../navSections';
import {Link} from 'react-router-dom';
import IconListItem from '../../IconListItem/IconListItem';

const PopOverNav = ({navChange}) => {

	return (
		<div className='nav'>
			{
				navSections.map(section => {
					const { title, to, icon } = section;
					let mobileTitle = title;
					if (title === 'Word Of The Day') {
						mobileTitle = 'WOD'
					}

					return(
						<div key={title} className='link' onClick={()=>navChange(mobileTitle)}>
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
