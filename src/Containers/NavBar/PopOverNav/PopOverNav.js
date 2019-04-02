import React from 'react';
import './PopOverNav.css';
import navSections from '../navSections';
import {Link} from 'react-router-dom';
import IconListItem from '../../../Components/IconListItem/IconListItem';

const PopOverNav = ({navChange, closeOnClick}) => {

	const handleNavChange = (mobileTitle) => {
		closeOnClick()
		navChange(mobileTitle)
	}

	return (
		<div className='nav'>
			{
				navSections.map(section => {
					const { title, to, icon } = section;
					const mobileTitle = (title === 'Word Of The Day')
						? 'WOD'
						: title

					return(
						<div key={title} className='link' onClick={()=>handleNavChange(mobileTitle)}>
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
