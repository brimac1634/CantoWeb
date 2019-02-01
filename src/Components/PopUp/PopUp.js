import React from 'react';
import './PopUp.css';
import Icon from '../Icon/Icon';


const PopUp = ({ showPopUp, popUpToggle, handlePopUpView, children }) => {

	let fadeType = 'animate-fade-in'
	let popType = 'animate-pop-in'

	if (showPopUp === false) {
		fadeType = 'animate-fade-out'
		popType = 'animate-pop-out'
		setTimeout(() => popUpToggle('home'), 1100);
	}

	return (
		<div className={`shade-background ${fadeType}`}>
			<div className={`sign-in-box ${popType}`}>
				<button className='close' onClick={handlePopUpView}>
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