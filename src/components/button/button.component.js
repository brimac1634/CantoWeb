import React from 'react';

import Icon from '../icon/icon.component';

import './button.styles.scss'

const Button = ({ title, handleClick, icon, isSelected, width, height, margin, padding, color, textColor, iconSize, isDisabled, ...otherProps }) => {
	const active = isDisabled ? 'btn-disabled' : 'btn-active'
	const buttonSelect = isSelected ? 'selected-button' : null;

	return (
		<button 
			className={`btn ${buttonSelect} ${active}`} 
			onClick={handleClick}
			style={{
				width: `${width ? width : 'auto'}`, 
				height: `${height ? height : 'auto'}`,
				margin: `${margin ? margin : '10px'}`,
				padding: `${padding ? padding : '5px 15px'}`,
				background: `${color ? color : null}`
			}}
			{ ...otherProps }
		>
			{icon 
				? <div style={{width: `${iconSize}px`}}>
					<Icon icon={icon} color={isDisabled ? 'cantoDarkGray' : null} iconSize={iconSize ? iconSize : '18'}/>
					</div>
				: null
			}	
			{title
				? 	<p 
						className={`title ${icon ? 'with-icon' : null}`}
						style={{color: textColor || null}}
					>{title}</p>
				: 	null
			}
		</button>
	);
}

export default Button;