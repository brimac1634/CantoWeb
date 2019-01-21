import React from 'react';
import './Icon.css';
import iconPaths from './selection.json';

const Icon = ({ icon, iconStyle, width, title }) => {

	let iconWidth = 20;
	let style = 'light';

	if (width != null) {
		iconWidth = width
	}

	if (iconStyle === 'dark') {
		style = 'dark';
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
			<svg className={style} width={`${iconWidth}px`} height={`${iconWidth}px`} viewBox="0 0 1024 1024">
			    <path d={getPath(icon)}></path>
			</svg>
			{
				title != null &&
				<p>{title}</p>
			}
			
		</div>
	);
}



export default Icon;