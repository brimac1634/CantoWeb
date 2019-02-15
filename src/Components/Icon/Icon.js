import React from 'react';
import './Icon.css';
import iconPaths from './selection.json';

const Icon = ({ iconType, icon, iconStyle, width, title, color }) => {

	let iconWidth = 20;
	let style = 'light';
	let type = 'icon-btn';

	if (width != null) {
		iconWidth = width
	}

	if (iconStyle != null) {
		style = iconStyle;
	}

	if (iconType === 'icon') {
		type = 'icon'
	}

	const fillColor = (color) => {
		switch (color) {
			case 'cantoPink': return '#ff7a8a';
			case 'cantoDarkBlue': return '#062743';
			case 'cantoWhite': return '#f9f9f9';
			default: return '#062743';
		}
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
		<div className={type}>
			<svg 
				className={style} 
				width={`${iconWidth}px`} 
				height={`${iconWidth}px`} 
				viewBox="0 0 1024 1024"
				style={{fill: `${fillColor(color)}`}}
			>
			    <path d={getPath(icon)}></path>
			</svg>
			{
				title != null &&
				<p style={{color: `${fillColor(color)}`}}>{title}</p>
			}
			
		</div>
	);
}



export default Icon;