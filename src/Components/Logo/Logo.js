import React from 'react';
import './Logo.css';
import CantoIcon from './CantoTalkIconBlue.png';

const Logo = () => {
	return (
		<div className='logo'>
			<img src={CantoIcon} alt='CantoTalk Icon'/>
			<h3>CantoTalk</h3>
		</div>
	);
}

export default Logo;