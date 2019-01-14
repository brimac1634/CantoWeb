import React from 'react';
import './Logo.css';
import CantoIcon from './CantoTalkIconLatest.png';

const Logo = () => {
	return (
		<div className='logo'>
			<img src={CantoIcon} alt='CantoTalk Icon'/>
			<h2>CantoTalk</h2>
		</div>
	);
}

export default Logo;