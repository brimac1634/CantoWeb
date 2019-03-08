import React from 'react';
import './Button.css'
import Icon from '../Icon/Icon';

const Button = ({ title, handleClick, buttonType, icon, isSelected, width, height }) => {
	const type = buttonType ? buttonType : 'full';
	const titleType = icon ? 'with-icon' : 'without-icon';
	const buttonSelect = isSelected ? 'selected-button' : null;
	return (
		<div 
			className={`${type} ${buttonSelect}`} 
			onClick={handleClick}
			style={{
				width: `${width ? width : null}`, 
				height: `${height ? height : null}`
			}}
		>
			{icon 
				? <Icon icon={icon} iconSize='18'/>
				: null}	
			{title
				? <p className={titleType}>{title}</p>
				: null}
		</div>
	);
}

export default Button;