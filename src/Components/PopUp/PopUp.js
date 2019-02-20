import React from 'react';
import './PopUp.css';
import Icon from '../Icon/Icon';


const PopUp = ({ animateOut, removePopUpEnd, removePopUpBegin, children }) => {

	let fadeType = 'animate-fade-in'
	let popType = 'animate-pop-in'

	if (animateOut === true) {
		fadeType = 'animate-fade-out'
		popType = 'animate-pop-out'
		setTimeout(() => removePopUpEnd(), 1100);
	}

	return (
		<div className={`shade-background ${fadeType}`}>
			<div className={`pop-up ${popType}`}>
				<button className='close' onClick={removePopUpBegin}>
					<Icon 
						icon='multiply' 
						iconStyle='dark' 
						width='15'
					/>
				</button>
				{children}
			</div>
		</div>
	);
}

export default PopUp;