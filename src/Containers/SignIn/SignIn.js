import React, {Component} from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import Logo from '../../Components/Logo/Logo';
import Button from '../../Components/Button/Button';
import TextInput from '../../Components/TextInput/TextInput';
import ReactTooltip from 'react-tooltip'
import { setUser } from './actions';
import { setAlert } from '../../Components/PopUpAlert/actions';

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(setUser(user)),
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

	onUserSubmit = () => {
		const { title, email, password } = this.state;
		const { presentAlert } = this.props;
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
				fetch('http://localhost:3000/signin', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(res => res.json())
					.then(userData => {
						const user = {
							userID: userData.id,
							userEmail: userData.email,
						}
						const alert = {
					        title: 'Login Successful',
					        message: `You are now logged in as "${user.userEmail}".`,
					        showAlert: true,
					    }
						this.handleUpdateUser(user)
						presentAlert(alert)
					})
					.catch(err => console.log('Unable to login'))

			} else {
				//register
				fetch('http://localhost:3000/register', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(res => res.json())
					.then(userData => {
						const user = {
							userID: userData.id,
							userEmail: userData.email,
						}
						const alert = {
					        title: 'Registration Successful',
					        message: `You are now logged in as "${user.userEmail}".`,
					        showAlert: true,
					    }
						this.handleUpdateUser(user)
						presentAlert(alert);
					})
					.catch(console.log)
			}
		}
		
    }

	render() {
		const { title, signInButton, alternateButton} = this.state;
		return (
			<div className='sign-in-container'>
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
export default connect(null, mapDispatchToProps)(SignIn);