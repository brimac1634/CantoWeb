import React from 'react';
import './Icon.css';
import iconPaths from './selection.json';

const Icon = (props) => {

	let width = 20;
	let iconStyle = 'light';

	if (props.width != null) {
		width = props.width
	}

	if (props.iconStyle === 'dark') {
		iconStyle = 'dark';
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
		<a href='#' className='icon'>
			<svg className={iconStyle} width={`${width}px`} height={`${width}px`} viewBox="0 0 1024 1024">
			    <path d={getPath(props.icon)}></path>
			</svg>
			<p>{props.title}</p>
		</a>
	);
}



export default Icon;