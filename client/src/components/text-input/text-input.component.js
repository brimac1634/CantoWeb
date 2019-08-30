import React from 'react';

import Icon from '../icon/icon.component';
import Button from '../button/button.component';
import Controller from '../compound/controller.component';
import Trigger from '../compound/trigger.component';
import DropDown from '../drop-down/drop-down.component';

import './text-input.styles.scss'

const TextInput = ({ icon, handleChange, height, margin, padding, handleClick, isTextArea, button, buttonList, handleDropDown, ...otherProps }) => {
	const inputHeight = height ? height : '44px';
	const container = isTextArea ? 'input-area-group' : 'input-group';

	const style = {
		height: `${inputHeight}`, 
		margin: margin ? margin : '10px',
		padding: padding ? padding : '5px 10px',
	}

	return (
		<div className='text-input'>
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
							onChange={handleChange}
							{ ...otherProps }
						/>
					:   <input 
							className='text-input'
							onChange={handleChange}
							{ ...otherProps }
						/>

				}
			</div>
		</div>
	);
}

export default TextInput;