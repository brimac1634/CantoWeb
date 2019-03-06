import React from 'react';
import './Icon.css';
import iconPaths from './selection.json';

const Icon = ({ icon, iconSize, title, color }) => {

	const size = iconSize ? iconSize : 20;

	const fillColor = (color) => {
		switch (color) {
			case 'cantoPink': return '#ff7a8a';
			case 'cantoDarkBlue': return '#062743';
			case 'cantoWhite': return '#f9f9f9';
			case 'cantoGray': return '#e0e0e0';
			case 'cantoDarkGray': return '#d1d1d1';
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
		<div className='icon'>
			<svg 
				width={`${size}px`} 
				height={`${size}px`} 
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