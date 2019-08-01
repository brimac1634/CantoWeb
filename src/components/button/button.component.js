import React from 'react';
import './button.styles.css'
import Icon from '../icon/icon.component';

const Button = ({ title, handleClick, buttonType, icon, isSelected, width, height, margin, padding, color, textColor, type, iconSize, isDisabled }) => {
	const active = isDisabled ? 'btn-disabled' : 'btn-active'
	const titleType = icon ? 'with-icon' : 'without-icon';
	const buttonSelect = isSelected ? 'selected-button' : null;

	return (
		<div 
			className={`${buttonSelect} ${active}`} 
			onClick={handleClick}
			type={type}
			style={{
				width: `${width ? width : 'auto'}`, 
				height: `${height ? height : 'auto'}`,
				margin: `${margin ? margin : '10px'}`,
				padding: `${padding ? padding : '5px 15px'}`,
				background: `${color ? color : null}`
			}}
		>
			{icon 
				? <div style={{width: `${iconSize}px`}}>
					<Icon icon={icon} color={isDisabled ? 'cantoDarkGray' : null} iconSize={iconSize ? iconSize : '18'}/>
					</div>
				: null
			}	
			{title
				? 	<p 
						className={titleType}
						style={{color: textColor || null}}
					>{title}</p>
				: 	null
			}
		</div>
	);
}

export default Button;