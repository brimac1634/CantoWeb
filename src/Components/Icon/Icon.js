import React from 'react';
import './Icon.css';

const Icon = (props) => {

	let width = 20;

	if (props.width != null) {
		width = props.width
	}

	return (
		<div className='icon'>
			<svg width={`${width}px`} height={`${width}px`} viewBox="0 0 1024 1024">
			    <path d={props.icon}></path>
			</svg>
			<p>{props.title}</p>
		</div>
	);
}



export default Icon;