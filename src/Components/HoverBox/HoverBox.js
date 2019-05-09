import React from 'react';
import './HoverBox.css';
import Icon from '../../Components/Icon/Icon';
import { Link } from 'react-router-dom';
import { routes } from '../../Routing/constants';

const HoverBox = ({ children, handleClick }) => {
	const { ROOT } = routes;

	return (
		<div className='hover-box-container'>
			<Link to={ROOT}>
				<button className='hover-close' onClick={handleClick}>
                  <Icon 
                    icon='multiply' 
                    iconStyle='dark' 
                    width='15'
                  />
                </button>
            </Link>
            {children}
		</div>
	);
}

export default HoverBox;