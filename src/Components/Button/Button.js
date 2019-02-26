import React from 'react';
import './Button.css'

const Button = ({ title, handleClick, buttonType }) => {
	return (
		<button 
			className={buttonType} 
			onClick={handleClick}
		>
			{title}
		</button>
	);
}

export default Button;