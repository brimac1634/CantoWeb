import React from 'react';
import './TextInput.css'
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import DropDown from '../../Containers/DropDown/DropDown';

const TextInput = ({ placeHolder, icon, handleChange, handleInput, value, height, type, margin, padding, handleClick, id, isTextArea, name, button, buttonList, handleDropDown }) => {
	const inputHeight = height ? height : '44px';
	const container = isTextArea ? 'input-area-group' : 'input-group';

	const style = {
		height: `${inputHeight}`, 
		margin: margin ? margin : '10px',
		padding: padding ? padding : '5px 10px',
	}

	return (
		<div className={container} style={style} onClick={handleClick}>
			{icon != null &&
				<div className='icon-group'>
					<div className='input-icon'>
						<Icon iconSize='18' icon={icon} color='cantoBlue'/>
					</div>
					<div className='input-divider'>&nbsp;</div>
				</div>
			}
			{button != null &&
				<div className='btn-container' onClick={e=>e.stopPropagation()}>
					<Controller>
						<Trigger>
							<div className='icon-group'>
								<Button 
									title={button}
									buttonType='ghost'
									height='100%'
									margin='0 10px 0 0'
									padding='0 16px'
								/>
							</div>
						</Trigger>
						<DropDown 
							list={buttonList} 
							handleSelection={handleDropDown}
							padding='0'
						/>
					</Controller>
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
						name={name}
					/>
				:   <input 
						className='text-input'
						id={id}
						placeholder={placeHolder}
						onChange={handleChange}
						onKeyPress={handleInput}
						value={value}
						type={type}
						name={name}
					/>

			}
		</div>
	);
}

export default TextInput;