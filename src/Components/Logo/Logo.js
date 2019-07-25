import React from 'react';
import CantoIcon from '../../Assets/CantoTalkIconBlue.png';

const Logo = ({ iconSize, margin }) => {
	let height = (iconSize) ? iconSize : '100%';
	return (
		<div style={{margin: margin || null}}>
			<img 
				src={CantoIcon} 
				height={height} 
				width='auto' 
				alt='CantoTalk Icon'
			/>
		</div>
	);
}

export default Logo;