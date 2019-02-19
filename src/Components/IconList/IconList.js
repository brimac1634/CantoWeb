import React from 'react';
import ListItem from './ListItem';

const IconList = (props) => {
	const { title, items } = props;
	return (
		<div style={{width: '100%', height: '100%'}} className='list'>
			{title != null 
				? <div>
					<h4>{title}</h4>
					<div>&nbsp;</div> 
				  </div>
				: null
			}
			{
				items.map(item => {
					const { title, icon, handleClick } = item;
					return (
						<ListItem 
							icon={icon} 
							title={title}
							key={title} 
							handleClick={handleClick}
						/>
					);
				})	
			}
		</div>

	);
}
export default IconList;