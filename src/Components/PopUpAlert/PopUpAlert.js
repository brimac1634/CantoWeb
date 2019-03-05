import React from 'react';
import './PopUpAlert.css';
import Icon from '../Icon/Icon';
import { connect } from 'react-redux';
import { setAlert } from './actions';

const mapStateToProps = state => {
	return {
		alert: state.alert.alert
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		presentAlert: (alert) => dispatch(setAlert(alert)),
	}
}

const PopUpAlert = ({ alert: { title, message, showAlert, icon }, presentAlert }) => {
	let alertStatus = showAlert ? 'alertIsVisible' : 'alertIsHidden'
	if (showAlert) {
		setTimeout(() => {
			const clearAlert = {
		        title: '',
		        message: '',
		        showAlert: false,
		        icon: '',
		    }
		    presentAlert(clearAlert);
		}, 4000)
	}

	const renderIcon = () => {
		if (icon !== '' && icon != null) {
			return (
				<div className='alert-icon-group'>
					<div className='alert-input-icon'>
						<Icon iconSize='32' icon={icon} color='cantoBlue'/>
					</div>
					<div className='input-divider'>&nbsp;</div>
				</div>
			);
		}
	}

	return (
		<div className={`alert ${alertStatus}`}>
			{renderIcon()}
			<div className='message'>
				<h4>{title}</h4>
				<p>{message}</p>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpAlert);