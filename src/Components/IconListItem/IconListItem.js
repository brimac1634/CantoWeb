import React from 'react';
import './IconListItem.css';
import Icon from '../Icon/Icon';

const IconListItem = ({ icon, title, bold, handleClick }) => {
	const titleStyle = bold ? 'bold' : null
	return (
		<div className='list-item' onClick={handleClick}>
			{
				icon &&
				<div className='list-icon-container'>
					<Icon 
						icon={icon}
						iconType='icon' 
						iconSize='22'
					/>
				</div>
			}
			<p className={titleStyle}>{title}</p>
		</div>
	);
}
export default IconListItem;