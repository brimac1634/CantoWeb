import React from 'react';
import './Icon.css';
import iconPaths from './selection.json';

const Icon = (props) => {

	let width = 20;

	if (props.width != null) {
		width = props.width
	}

	function getPath(iconName) {
	  const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);

		  if (icon) {
		    return icon.icon.paths.join(' ');
		  } else {
		    console.warn(`icon ${iconName} does not exist.`);
		    return '';
		  }
	}

	return (
		<div className='icon'>
			<svg width={`${width}px`} height={`${width}px`} viewBox="0 0 1024 1024">
			    <path d={getPath(props.icon)}></path>
			</svg>
			<p>{props.title}</p>
		</div>
	);
}



export default Icon;