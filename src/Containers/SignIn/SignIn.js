import React, {Component} from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import {Link} from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import Icon from '../../Components/Icon/Icon';
import Button from '../../Components/Button/Button';
import TextInput from '../../Components/TextInput/TextInput';
import ReactTooltip from 'react-tooltip'
import apiRequest from '../../Helpers/apiRequest';
import { setUser } from './actions';
import { setAlert } from '../../Components/PopUpAlert/actions';

const mapStateToProps = (state, ownProps) => {
	return {
		prevRoute: state.prevRoute.route,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(setUser(user)),
		updateURL: (path) => dispatch(push(path)),
		presentAlert: (alert) => dispatch(setAlert(alert)),
	}
}

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Login',
			signInButton: 'Sign In',
			alternateButton: 'register',
			email: '',
			password: '',
		}
	}


	signInToggle = (type) => {
		if (type === 'sign in') {
			this.setState({
				title: 'Login',
				signInButton: 'Sign In',
				alternateButton: 'register',
			})
		} else if (type === 'register') {
			this.setState({
				title: 'Register',
				signInButton: 'Register',
				alternateButton: 'sign in',
			})
		}
	}

	onEmailChange = (event) => this.setState({ email: event.target.value })
	onPasswordChange = (event) => this.setState({ password: event.target.value })

	handleClose = () => {
		const { updateURL, prevRoute } = this.props;
		updateURL(prevRoute)
	}

	validateEmail = (email) => {
		const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regexp.test(email);
	}

	validatePassword = (password) => {
		return password.length >= 6 ? true : false;
	}

	handleUpdateUser = (user) => {
		const { updateUser } = this.props;
		localStorage.setItem('user', JSON.stringify(user));
		updateUser(user);
	}

	createUser = (userData) => {
		return {
			userID: userData.id,
			userEmail: userData.email,
		}
	}

	onUserSubmit = () => {
		const { title, email, password } = this.state;
		const { presentAlert, prevRoute, updateURL } = this.props;
		const emailIsValid = this.validateEmail(email);
		const passwordIsValid = this.validatePassword(password);
		if (!emailIsValid && !passwordIsValid) {
			//give alert that there is missing info
		} else if (!emailIsValid) {
			//give alert that email is incorrect
		} else if (!passwordIsValid) {
			//give alert that password must contain 6 characters
		} else {
			if (title === 'Login') {
				//login
				apiRequest({
					endPoint: '/signin',
					method: 'POST',
					body: {email, password} 
				})
					.then(userData => {
						const user = this.createUser(userData)
						const alert = {
					        title: 'Login Successful',
					        message: `You are now logged in as "${user.userEmail}".`,
					        showAlert: true,
					    }
						this.handleUpdateUser(user)
						presentAlert(alert)
						updateURL(prevRoute)
					})

			} else {
				//register
				apiRequest({
					endPoint: '/register',
					method: 'POST',
					body: {email, password} 
				})
					.then(userData => {
						const user = this.createUser(userData)
						const alert = {
					        title: 'Registration Successful',
					        message: `You are now logged in as "${user.userEmail}".`,
					        showAlert: true,
					    }
						this.handleUpdateUser(user)
						presentAlert(alert);
						updateURL(prevRoute)
					})
			}
		}
		
    }

	render() {
		const { title, signInButton, alternateButton} = this.state;
		return (
			<div className='sign-in-container'>
				<Link to='/'>
					<button className='sign-in-close' onClick={this.handleClose}>
	                  <Icon 
	                    icon='multiply' 
	                    iconStyle='dark' 
	                    width='15'
	                  />
	                </button>
                </Link>
				<Logo iconSize='50px' />
				<h2>{title}</h2>
				<TextInput 
					icon='user-3' 
					placeHolder='Email Address'
					handleChange={this.onEmailChange}
				/>
				<TextInput 
					icon='locked-4' 
					placeHolder='Password'
					isPassword='true'
					handleChange={this.onPasswordChange}
				/>
				<Button 
					buttonType='ghost' 
					title={signInButton}
					handleClick={this.onUserSubmit}
				/>
				<div className='bottom-row'>
					<p 
						className='underline-button' 
						onClick={() => this.signInToggle(alternateButton)}
					>
						{alternateButton}
					</p>
					<div data-tip={`Creating a profile allows you to
					 <br> keep  track of your previous searches, save 
					 <br>favorites, build your own flash card decks, and 
					 <br>more! This will also make it possible to sync 
					 <br>information between devices.`} data-multiline='true'>
						<p className='underline-button right-button' >
							why?
						</p>
					</div>
					<ReactTooltip effect='solid' place='right' type='dark'/>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);