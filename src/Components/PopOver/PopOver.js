import React from 'react';
import './PopOver.css';

const PopOver = (props) => {

	const { 
		arrowLocation,
		animateOut,
		width,
		height,
		x,
		y,
		triggerWidth,
		children } = props;

	
	const xPoint = (x - width + triggerWidth);
	let popType = 'animate-pop-in'

	if (animateOut === true) {
		popType = 'animate-pop-out';
	}

	return (
		<div 
			className={`pop-over ${popType} ${arrowLocation}`} 
			style={{width: `${width}px`, height: `${height}px`, top: `${y}px`, left: `${xPoint}px`}}
		>
			<div className='pop-over-arrow'/>
			{children}
		</div>
	);
}

export default PopOver;