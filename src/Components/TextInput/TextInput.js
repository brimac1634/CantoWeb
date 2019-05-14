import React from 'react';
import './TextInput.css'
import Icon from '../Icon/Icon';

const TextInput = ({ placeHolder, icon, handleChange, handleInput, value, height, isPassword, margin, handleClick, id, isTextArea }) => {
	const inputHeight = height ? height : '44px';
	const type = isPassword ? 'password' : null;
	const container = isTextArea ? 'input-area-group' : 'input-group';
	return (
		<div className={container} style={{height: `${inputHeight}`, margin: margin ? margin : '10px'}} onClick={handleClick}>
			{icon != null &&
				<div className='icon-group'>
					<div className='input-icon'>
						<Icon iconSize='18' icon={icon} color='cantoBlue'/>
					</div>
					<div className='input-divider'>&nbsp;</div>
				</div>
			}
			{isTextArea
				?   <textarea
						className='text-input text-area'
						id={id}
						placeholder={placeHolder}
						onChange={handleChange}
						onKeyPress={handleInput}
						value={value}
					/>
				:   <input 
						className='text-input'
						id={id}
						placeholder={placeHolder}
						onChange={handleChange}
						onKeyPress={handleInput}
						value={value}
						type={type}
					/>

			}
		</div>
	);
}

export default TextInput;