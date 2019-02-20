import React from 'react';
import './IconListItem.css';
import Icon from '../Icon/Icon';

const IconListItem = ({ icon, title, handleClick }) => {
	return (
		<button className='list-item-btn' onClick={handleClick}>
			<div className='list-item'>
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
		</button>
	);
}
export default IconListItem;