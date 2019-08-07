import React from 'react';

import Logo from '../../components/logo/logo.component';

import './what-is-cantotalk.styles.scss';

const WhatIsCantoTalk = () => (
	<div className='what-page'>
		<div className='what'>
			<div className='banner-logo-container'>
				<Logo iconSize='50px' />
				<h1 className='heading'>CantoTalk</h1>
			</div>
			<h3 className='pink'>Current Day Cantonese</h3>
			<h3>When You Need It</h3>
			<p>CantoTalk is a online "pocket" dictionary that provides users with the most useful Cantonese words and phrases to help readers communicate effectively in daily life. Representing the modern, standard usage of Cantonese, this dictionary includes informal words and phrases that local speakers actually use. Users have the ability to create profiles, allowing them to customize learning materials, keep track of progress, and to save freshly learned vocabulary. More words and phrases are added to the database regulary to keep this dictionary up to date, so check back regularly! 
			</p>
		</div>
	</div>
);
export default WhatIsCantoTalk;
