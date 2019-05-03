import React from 'react';
import '../../Helpers/Compound/Compound.css';
import IconListItem from '../../Components/IconListItem/IconListItem';

const DropDown = ({ list, animateOut, closeOnClick, handleSelection, triggerRect: {x, y, width, height}}) => {

	const handleSelect = (item) => {
		handleSelection(item)
		closeOnClick()
	}

	let popType = animateOut ? 'animate-out' : 'animate-in'

	return (
		<div 
			className={`drop-down ${popType}`} 
			style={{width: `${width}px`, height: `auto`, top: `${y + height - 10}px`, left: `${x}px`}}
		>
			<div>
				{
					list.map((item, i) => {
						return (
							<IconListItem 
								key={i}
								title={item} 
								handleClick={()=>handleSelect(item)}
							/>
						)
					})
				}
			</div>
		</div>
	);
	
}

export default DropDown;