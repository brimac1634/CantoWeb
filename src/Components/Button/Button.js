import React from 'react';
import './Button.css'
import Icon from '../Icon/Icon';

const Button = ({ title, handleClick, buttonType, icon }) => {
	const type = buttonType ? buttonType : 'full';
	return (
		<div 
			className={type} 
			onClick={handleClick}
		>
			{icon 
				? <Icon icon={icon} iconSize='18'/>
				: null}	
			<p>{title}</p>
		</div>
	);
}

export default Button;