import React from 'react';
import CantoIcon from '../../Assets/CantoTalkIconBlue.png';

const Logo = ({ iconSize }) => {
	let height = (iconSize) ? iconSize : '100%';
	return (
		<img src={CantoIcon} height={height} width='auto' alt='CantoTalk Icon'/>
	);
}

export default Logo;