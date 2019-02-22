import React from 'react';
import './IconListItem.css';
import Icon from '../Icon/Icon';

const IconListItem = ({ icon, title, handleClick }) => {
	return (
		<div className='list-item' onClick={handleClick}>
			<div className='list-icon-container'>
				<Icon 
					icon={icon} 
					iconType='icon' 
					width='22' 
					color='cantoDarkBlue'
				/>
			</div>
			<p>{title}</p>
		</div>
	);
}
export default IconListItem;