import React from 'react';
import './PopUpAlert.css';
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

const PopUpAlert = ({ alert: { title, message, showAlert }, presentAlert }) => {
	let alertStatus = showAlert ? 'alertIsVisible' : 'alertIsHidden'
	if (showAlert) {
		setTimeout(() => {
			const clearAlert = {
		        title: '',
		        message: '',
		        showAlert: false,
		    }
		    presentAlert(clearAlert);
		}, 4000)
	}

	return (
		<div className={`alert ${alertStatus}`}>
			<h4>{title}</h4>
			<p>{message}</p>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpAlert);