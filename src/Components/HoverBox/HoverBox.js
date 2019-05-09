import React from 'react';
import './HoverBox.css';
import { connect } from 'react-redux';
import Icon from '../../Components/Icon/Icon';
import { Link } from 'react-router-dom';
import { routes } from '../../Routing/constants';

const mapStateToProps = state => {
  return {
    prevRoute: state.prevRoute.route,
  }
}

const HoverBox = ({ children, handleClick, prevRoute }) => {
	const { ROOT } = routes;

	return (
		<div className='hover-box-container'>
			<Link to={prevRoute ? prevRoute : ROOT}>
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

export default connect(mapStateToProps, null)(HoverBox);