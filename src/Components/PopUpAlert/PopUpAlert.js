import React from 'react';
import './PopUpAlert.css';

const PopUpAlert = ({ title, message, showAlert }) => {
	let alertStatus = showAlert ? 'alertIsVisible' : 'alertIsHidden'
	return (
		<div className={`alert ${alertStatus}`}>
			<h4>{title}</h4>
			<p>{message}</p>
		</div>
	);
}

export default PopUpAlert;