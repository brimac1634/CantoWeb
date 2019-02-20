import React from 'react';

const FSPTrigger = ({ togglePopUp, children }) => {

    const style = {
    	background: 'transparent',
		outline: 'none',
		border: 'none',
		width: '100%',
		height: '100%',
		padding: 0
    }

	return (
		<button 
			style={style}
			className='center-div'
			onClick={togglePopUp}
		>
			{children}
		</button>
	);
}
export default FSPTrigger;