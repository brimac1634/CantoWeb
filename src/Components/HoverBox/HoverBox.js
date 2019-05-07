import React from 'react';
import './HoverBox.css';
import Icon from '../../Components/Icon/Icon';
import { Link } from 'react-router-dom';
import { routes } from '../../Routing/constants';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	return {
		prevRoute: state.prevRoute.route,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (path) => dispatch(push(path)),
	}
}

const HoverBox = ({ updateURL, prevRoute, children }) => {
	const { ROOT } = routes;

	const handleClose = () => {
		updateURL(prevRoute)
	}

	return (
		<div className='hover-box-container'>
			<Link to={ROOT}>
				<button className='hover-close' onClick={handleClose}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoverBox);