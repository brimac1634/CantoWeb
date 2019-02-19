import React from 'react';
import './ListItem.css';
import Icon from '../Icon/Icon';

const ListItem = ({ icon, title, handleClick }) => {
	return (
		<button className='list-item' onClick={handleClick}>
			<Icon icon={icon} color='cantoDarkGray'/>
			<p>{title}</p>
		</button>
	);
}
export default ListItem;