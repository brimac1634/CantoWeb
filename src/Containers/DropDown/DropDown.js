import React from 'react';
import '../../Helpers/Compound/Compound.css';
import IconListItem from '../../Components/IconListItem/IconListItem';
import MediaQuery from 'react-responsive';

const DropDown = ({ list, animateOut, toggle, maxHeight, padding, handleSelection, adjustY, triggerRect: {x, y, width, height}}) => {

	const handleSelect = (item) => {
		handleSelection(item)
		toggle()
	}

	let popType = animateOut ? 'animate-out' : 'animate-in'
	const adjustYVal = adjustY ? adjustY : 0

	const renderDropDown = () => {
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
									padding={padding}
								/>
							)
						})
					}
				</div>
			</div>
		);
	}
	
	return (
		<div>
			<MediaQuery minWidth={700}>
				{renderDropDown()}
			</MediaQuery>
			<MediaQuery maxWidth={699}>
				<div
		            className='back-overlay'
		            onClick={toggle}
		        >
					{renderDropDown()}
				</div>
			</MediaQuery>
		</div>
		
	);
	
}

export default DropDown;