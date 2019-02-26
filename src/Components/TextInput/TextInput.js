import React from 'react';
import './TextInput.css'
import Icon from '../Icon/Icon';

const TextInput = ({ placeHolder, icon, handleChange }) => {
	return (
		<div className='input-group'>
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
				placeHolder={placeHolder}
				onChange={handleChange}
			/>
		</div>
	);
}

export default TextInput;