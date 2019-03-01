import React from 'react';
import './WhatIsCantoTalk.css';
import Logo from '../Logo/Logo';

const WhatIsCantoTalk = () => {
	return (
		<div className='what-is-cantotalk'>
			<div className='banner-logo-container'>
				<Logo iconSize='50px' />
				<h1>CantoTalk</h1>
			</div>
			<h3>- Current Day Cantonese, When You Need It -</h3>
			<p>CantoTalk is a online dictionary that provides users with the Cantonese words and phrases that local speakers actually use in daily life. Users also have the ability to create profiles, allowing them to customize learning materials, keep track of progress, and to save freshly learned vocabulary. More words and phrases are added to the database regulary to keep this dictionary up to date. 
			</p>
		</div>
	);
		
}
export default WhatIsCantoTalk;
