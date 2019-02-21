import React from 'react';
import './LogoFull.css';
import Logo from '../Logo/Logo';

const LogoFull = ({ iconSize, fontSize }) => {
	let defaultFontSize = (fontSize) ? fontSize : '1.17em';
	let defaultIconSize = (iconSize) ? iconSize : '30px';
	return (
		<div className='logo-full' >
			<Logo iconSize={defaultIconSize}/>
			<h3 style={{fontSize: `${defaultFontSize}`}}>CantoTalk</h3>
		</div>
	);
}

export default LogoFull;