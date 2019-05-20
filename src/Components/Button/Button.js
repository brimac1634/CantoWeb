import React from 'react';
import './Button.css'
import Icon from '../Icon/Icon';

const Button = ({ title, handleClick, buttonType, icon, isSelected, width, height, margin, type }) => {
	const style = buttonType ? buttonType : 'full';
	const titleType = icon ? 'with-icon' : 'without-icon';
	const buttonSelect = isSelected ? 'selected-button' : null;
	return (
		<div 
			className={`${style} ${buttonSelect}`} 
			onClick={handleClick}
			type={type}
			style={{
				width: `${width ? width : 'auto'}`, 
				height: `${height ? height : 'auto'}`,
				margin: `${margin ? margin : '10px'}`
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