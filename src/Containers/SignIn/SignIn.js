import React, {Component} from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { serverError, connectionError, validateEmail } from '../../Helpers/helpers';
import queryString from 'query-string';
import MediaQuery from 'react-responsive';
import HoverBox from '../../Components/HoverBox/HoverBox';
import Button from '../../Components/Button/Button';
import TextInput from '../../Components/TextInput/TextInput';
import apiRequest from '../../Helpers/apiRequest';
import { routes } from '../../Routing/constants';
import { setUser } from './actions';
import { setLoading } from '../../Loading/actions';
import { setAlert } from '../../Components/PopUpAlert/actions';

const mapStateToProps = state => {
	return {
		prevRoute: state.prevRoute.route,
		pathName: state.router.location.pathname,
		search: state.router.location.search,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(setUser(user)),
		updateURL: (path) => dispatch(push(path)),
		presentAlert: (alert) => dispatch(setAlert(alert)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
}

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Login',
			signInButton: 'Sign In',
			alternateButton: 'register',
			token: '',
			name: '',
			email: '',
			password: '',
			password2: '',
			failCount: 0,
			rememberMe: true,
		}
	}

	componentDidMount() {
		const { LOGIN, REGISTER, VERIFY } = routes;
		const { pathName, search } = this.props;
		if (pathName === LOGIN) {
			this.setState({
				title: 'Login',
				signInButton: 'Sign In',
				alternateButton: 'Register',
			})
		} else if (pathName === REGISTER) {
			this.setState({
				title: 'Register',
				signInButton: 'Register',
				alternateButton: 'Sign In',
			})
		} else if (pathName === VERIFY) {
			const { token } = queryString.parse(search)
			this.setState({ token })
		}
		
	}


	signInToggle = (type) => {
		const { updateURL } = this.props;
		const { LOGIN, REGISTER } = routes;
		if (type === 'Sign In') {
			updateURL(LOGIN)
		} else if (type === 'Register') {
			updateURL(REGISTER)
		}
	}

	onInputChange = (event) => {
		const state = this.state
		const { id } = event.target
	    const { value } = event.target
	    state[id] = value
		this.setState(state)
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

	askToRegister = (title, message) => {
		optionAlert({
		    title: title,
		    message: `${message} Would you like to register now?`,
		    buttons: [
		    	{
		    		label: 'Yes',
			        onClick: () => this.signInToggle('Register')
		    	},
		    	{
		    		label: 'No',
			        onClick: () => null
		    	},
		    ]
	    })
	}

	onUserSubmit = () => {
		const { title, email, password, failCount } = this.state;
		const { setLoading, updateURL } = this.props;
		const { RESET } = routes;
		const emailIsValid = validateEmail(email);
		const passwordIsValid = this.validatePassword(password);
		if (!emailIsValid) {
			this.emailIsNotCorrect()
		} else {
			if (title === 'Login') {
				if (!passwordIsValid) {
					this.passwordIsIncomplete()
				} else {
					//login
					setLoading(true)
					apiRequest({
						endPoint: '/signin',
						method: 'POST',
						body: {email, password} 
					})
						.then(userData => {
							setLoading(false)
							if (userData && userData.error != null) {
								const { name, title, message } = userData.error;
								if (name === 'ServerError') {
									serverError()
								} else if (name === 'EmailNotRegistered') {
									this.askToRegister(title, message)
								} else if (name === 'RegistrationIncomplete') {
									this.askToRegister(title, message)
								} else if (name === 'ValidationError') {
									this.setState({
										failCount: failCount + 1
									})
									if (failCount <= 2) {
										optionAlert({
										    title: title,
										    message: message,
									    })
									} else {
										this.setState({failCount: 0})
										optionAlert({
										    title: 'Invalid Credentials',
										    message: 'The information you have entered does not match our records. Would you like to reset your password?',
										    buttons: [
										      {
										        label: 'Yes',
										        onClick: ()=>updateURL(RESET)
										      },
										      { 
										        label: 'No',
										        onClick: null
										      }
										    ]
									    })
									}
								}
							} else {
								this.handleLogin(title, userData)
							}
						})
						.catch(()=>{
							setLoading(false)
							connectionError()
						})
				}
			} else {
				this.handleVerification(email)
			}
		}
    }

    handleLogin = (type, userData) => {
    	const { presentAlert, prevRoute, updateURL } = this.props;
    	const user = this.createUser(userData)
    	let title = '';

    	if (type === 'Login') {
    		title = 'Login Successful'
    	} else if (type === 'Register') {
    		title = 'Registration Successful'
    	}

		const alert = {
	        title: title,
	        message: `You are now logged in as "${user.userEmail}".`,
	        showAlert: true,
	    }
		this.handleUpdateUser(user)
		presentAlert(alert);
		updateURL(prevRoute)
    }

    onVerifyEmail = () => {
    	const { token, password, password2 } = this.state;
    	const { setLoading, updateURL } = this.props;
    	const { RESET } = routes;
    	const passwordIsValid = this.validatePassword(password);
    	if (passwordIsValid && password === password2) {
    		setLoading(true)
    		apiRequest({
				endPoint: '/register/complete',
				method: 'POST',
				body: {password, token} 
			})
			.then(userData => {
				setLoading(false)
				if (userData && userData.error != null) {
					const { name, title, message } = userData.error;
					if (name === 'PasswordTokenExpired') {
						optionAlert({
						    title,
						    message: `${message} Would you like to reset your password now?`,
						    buttons: [
						      {
						        label: 'Yes',
						        onClick: ()=>updateURL(RESET)
						      },
						      { 
						        label: 'No',
						        onClick: null
						      }
						    ]
					    })
					} else if (name === 'UserNotFound') {
						this.askToRegister({
							title,
							message: `${message} Would you like to register now?`
						})
					}
				} else {
					this.handleLogin('Login', userData)
				}
			})
			.catch(()=>{
				setLoading(false)
				connectionError()
			})
    	} else if (!passwordIsValid) {
    		this.passwordIsIncomplete()
    	} else if (password !== password2) {
    		optionAlert({
			    title: 'Passwords Do Not Match',
			    message: 'Please ensure that both passwords are matching.'
		    })
    	}
    }

    handleVerification = (email) => {
    	const { name } = this.state;
    	const { setLoading } = this.props;
    	const body = {
    		name: name.length ? name : null,
    		email
    	}
    	setLoading(true)
			apiRequest({
				endPoint: '/register',
				method: 'POST',
				body: body
			})
				.then(userData => {
					setLoading(false)
					if (userData && userData.error != null) {
						const { title, message } = userData.error;
						optionAlert({
						    title,
						    message
					    })
					} else {
						optionAlert({
						    title: 'Verification Email Sent',
						    message: `Please check your email (${userData.email}) for a verification email. If you don't see the email shortly, check your spam folder.`
					    })
					}
				})
				.catch(err=>{
					setLoading(false)
					connectionError()
				})
    }

    onResetPassword = (email) => {
    	if (validateEmail(email)) {
    		this.handleVerification(email)
    	} else {
    		this.emailIsNotCorrect()
    	}
    }

    passwordIsIncomplete = () => {
    	optionAlert({
		    title: 'Invalid Password',
		    message: 'The password you have entered is incomplete. Please note that passwords must contain at least 6 characters.',
	    })
    }

    emailIsNotCorrect = () => {
    	optionAlert({
		    title: 'Invalid Email Address',
		    message: 'The email address you have entered is incomplete.',
	    })
    }

    renderComponent = (pathName) => {
    	const { title, email, name, password, password2, signInButton, alternateButton } = this.state;
    	const { LOGIN, REGISTER, VERIFY, RESET } = routes;
    	const { updateURL } = this.props;
    	
    	if (pathName === RESET || pathName === VERIFY) {
    		const heading = pathName === RESET ? 'Reset Account' : 'New Password'
			const line = pathName === RESET ? 'We will email you a link to reset your password.' : 'Please put your new password in both fields below.'
    		return (
    			<div className='sign-in-container'>
					<div className='right-panel'>
						<h2 className='right-title'>{heading}</h2>
						<p>{line}</p>
						{pathName === RESET &&
							<TextInput 
								icon='user-3' 
								margin='20px 0'
								placeHolder='Email Address'
								value={email}
								id='email'
								type='text'
								handleChange={this.onInputChange}
							/>
						}
						{pathName === VERIFY &&
							<div>
								<TextInput 
									icon='locked-4' 
									margin='20px 0 0 0'
									placeHolder='Password'
									value={password}
									type='password'
									id='password'
									handleChange={this.onInputChange}
								/>
								<TextInput 
									icon='locked-4' 
									margin='20px 0'
									placeHolder='Retype Password'
									value={password2}
									type='password'
									id='password2'
									handleChange={this.onInputChange}
								/>
							</div>
						}
						<Button 
							buttonType='ghost' 
							title='Continue'
							margin='0 0 30px 0'
							handleClick={pathName === VERIFY
								?	()=>this.onVerifyEmail()
								:   ()=>this.onResetPassword(email)
							}
						/>
					</div>
				</div>
    		)
    	} else if (pathName === LOGIN || pathName === REGISTER) {
    		const first = pathName === LOGIN ? 'Welcome Back,' : 'Welcome to CantoTalk!'
			const second = pathName === LOGIN ? 'we\'re happy to see you!' : 'But Why Register?'
			const message = pathName === LOGIN
				? 'Don\'t forget to use your CantoTalk profile to its fullest by keeping track of learned words and practicing with the flash card decks!'
				: 'Creating a profile allows you to keep track of your previous searches, save favorites, build your own flash card decks, and more! This will also make it possible to sync information between devices. '

    		return (
    			<div className='sign-in-container'>
					<div className='left-panel'>
						<MediaQuery minWidth={361}>
							<h1 className='pink contact-h'>{first}</h1>
							<h1 className='contact-h'>{second}</h1>
						</MediaQuery>
						<MediaQuery maxWidth={360}>
							<h2 className='pink contact-h'>{first}</h2>
							<h2 className='contact-h'>{second}</h2>
						</MediaQuery>
						<p>{message}</p>
					</div>
					<form className='right-panel' autoComplete='on'>
						<h2 className='right-title'>{title}</h2>
						{pathName === REGISTER &&
							<TextInput 
								icon='user-3' 
								margin='0'
								placeHolder='Name'
								value={name}
								id='name'
								name='name'
								type='text'
								handleChange={this.onInputChange}
							/>
						}
						<TextInput 
							icon='paper-plane-1' 
							margin={pathName === LOGIN ? '0' : '10px 0 20px 0'}
							placeHolder='Email Address'
							value={email}
							id='email'
							name='email'
							type='text'
							handleChange={this.onInputChange}
						/>
						{pathName === LOGIN &&
							<TextInput 
								icon='locked-4' 
								margin='20px 0'
								placeHolder='Password'
								value={password}
								name='password'
								type='password'
								id='password'
								handleChange={this.onInputChange}
							/>
						}
						<Button 
							buttonType='ghost' 
							title={signInButton}
							margin='0 0 30px 0'
							handleClick={this.onUserSubmit}
						/>
						{pathName === LOGIN &&
							<div className='bottom-row'>
								<p 
									className='underline-button' 
									onClick={()=>updateURL(RESET)}
								>Forgot Password</p>
							</div>
						}
						<div className='bottom-row'>
							<p className='mini'>
								{pathName === LOGIN
									? 'New to CantoTalk?'
									: 'Already Registered?'
								}
							</p>
							<p 
								className='underline-button' 
								onClick={() => this.signInToggle(alternateButton)}
							>
								{alternateButton}
							</p>
						</div>
					</form>
				</div>
    		)
    	}

    }

	render() {
		const { pathName } = this.props;
		return (
			<HoverBox>
					{this.renderComponent(pathName)}
			</HoverBox>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);