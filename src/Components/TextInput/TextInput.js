import React from 'react';
import './TextInput.css'
import Icon from '../Icon/Icon';

const TextInput = ({ placeHolder, icon, handleChange, value, height, isPassword }) => {
	const inputHeight = height ? height : '44px';
	const type = isPassword ? 'password' : null;
	return (
		<div className='input-group' style={{height: `${inputHeight}`}}>
			{icon != null &&
				<div className='icon-group'>
					<div className='input-icon'>
						<Icon iconSize='18' icon={icon} color='cantoBlue'/>
					</div>
					<div className='input-divider'>&nbsp;</div>
				</div>
			}
			
			<input 
				className='text-input'
				placeholder={placeHolder}
				onChange={handleChange}
				value={value}
				type={type}
			/>
		</div>
	);
}

export default TextInput;