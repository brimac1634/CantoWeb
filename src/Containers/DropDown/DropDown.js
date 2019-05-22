import React from 'react';
import '../../Helpers/Compound/Compound.css';
import IconListItem from '../../Components/IconListItem/IconListItem';

const DropDown = ({ list, animateOut, closeOnClick, maxHeight, handleSelection, adjustY, triggerRect: {x, y, width, height}}) => {

	const handleSelect = (item) => {
		handleSelection(item)
		closeOnClick()
	}

	let popType = animateOut ? 'animate-out' : 'animate-in'
	const adjustYVal = adjustY ? adjustY : 0
	
	return (
		<div 
			className={`drop-down ${popType}`} 
			style={{width: `${width}px`, height: `auto`, maxHeight: `${maxHeight}`, top: `${y + height + (adjustYVal)}px`, left: `${x}px`}}
		>
			<div className='scroll-list'>
				{	
					list !== null &&
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