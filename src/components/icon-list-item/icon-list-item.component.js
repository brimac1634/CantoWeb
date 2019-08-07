import React from 'react';
import './icon-list-item.styles.css';
import Icon from '../icon/icon.component';

const IconListItem = ({ icon, title, bold, handleClick, padding }) => {
	const titleStyle = bold ? 'bold' : null;
	const style = {padding: padding ? padding : '8px 20px'}
	return (
		<div className='list-item' onClick={handleClick} style={style}>
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