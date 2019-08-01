import React, {Component} from 'react';
import './sign-in.styles.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { serverError, connectionError, validateEmail } from '../../helpers/helpers';
import FacebookLogin from 'react-facebook-login';
import queryString from 'query-string';
import MediaQuery from 'react-responsive';
import { optionAlert } from '../../components/option-alert/option-alert.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import Button from '../../components/button/button.component';
import TextInput from '../../components/text-input/text-input.component';
import apiRequest from '../../helpers/apiRequest';
import { routes } from '../../redux/routing/routing.constants';
import { setUser } from '../../redux/sign-in/sign-in.actions';
import { setLoading } from '../../redux/loading/loading.actions';
import { setAlert } from '../../redux/pop-up-alert/pop-up-alert.actions';
import config from '../../config.json';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname,
		search: state.router.location.search,
		prevPath: state.prevRoute.route,
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
			didAgree: false,
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

	createUser = (userData) => {
		const { name, id, email } = userData;
		return {
			userName: name,
			userID: id,
			userEmail: email,
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
						.then(resData => {
							setLoading(false)
							if (resData && resData.error != null) {
								const { name, title, message } = resData.error;
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
										optionAlert({title, message})
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
								this.handleLogin(resData)
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

    handleLogin = (resData) => {
    	const { presentAlert, updateURL, updateUser, prevPath } = this.props;
    	const { SEARCH, LOGIN, REGISTER, VERIFY } = routes;
    	const user = this.createUser(resData.user)
		const alert = {
	        title: 'Login Successful',
	        message: `You are now logged in as ${user.userName}.`,
	        showAlert: true,
	    }
	    const cookies = new Cookies();
		cookies.set('authToken', resData.token, { path: '/' });
		updateUser(user);
		presentAlert(alert);
		if (prevPath) {
			const changePath = prevPath === LOGIN || prevPath === REGISTER || prevPath === VERIFY;
			updateURL(changePath ? SEARCH : prevPath)
		} else {
			updateURL(SEARCH)
		}
		
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
			.then(resData => {
				setLoading(false)
				if (resData && resData.error != null) {
					const { name, title, message } = resData.error;
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
					this.handleLogin(resData)
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
    	const { name, didAgree } = this.state;
    	const { setLoading } = this.props;
    	if (!/\S/.test(name)) {
    		optionAlert({
			    title: 'Provide your name',
			    message: `You must provide your full name in order to proceed with regsitration.`
		    })
    	} else if (!didAgree) {
    		optionAlert({
			    title: 'Privacy Policy',
			    message: `Please click the checkbox next to the privacy agreement in order to proceed with registration.`
		    })
    	} else {
    		const body = {name, email}
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

    responseFacebook = (response) => {
    	const { setLoading } = this.props;
    	if (response && response.email) {
    		const { accessToken, id, email, name } = response;
    		setLoading(true)
			apiRequest({
				endPoint: '/api/v1/auth/facebook',
				method: 'POST',
				body: {accessToken, id, email, name}
			})
				.then(userData => {
					if (userData && userData.error != null) {
						const { title, message } = userData.error;
						optionAlert({
						    title,
						    message
					    })
					} else {
						this.handleLogin(userData)
					}
					setLoading(false)
				})
				.catch(err=>{
					setLoading(false)
					connectionError()
				})
    	} else {
    		optionAlert({
			    title: 'Facebook Error',
			    message: 'There was an error logging in using Facebook. Please ensure that you are signed in to FaceBook.',
		    })
    	}
    }

    handleAgree = () => {
    	this.setState({didAgree: !this.state.didAgree})
    }

    renderPassword = (margin) => {
    	const { password } = this.state;
    	return (
    		<TextInput 
				icon='locked-4' 
				margin={margin}
				placeHolder='Password'
				value={password}
				type='password'
				id='password'
				handleChange={this.onInputChange}
			/>
    	)
    }

    renderEmail = () => {
    	const { email } = this.state;
    	return (
    		<TextInput 
				icon='user-3' 
				margin='20px 0'
				placeHolder='Email Address'
				value={email}
				id='email'
				name='email'
				type='text'
				handleChange={this.onInputChange}
			/>
    	)
    }

    renderComponent = (pathName) => {
    	const { title, email, name, password2, signInButton, alternateButton, didAgree } = this.state;
    	const { LOGIN, REGISTER, VERIFY, RESET, PRIVACY } = routes;
    	const { updateURL } = this.props;
    	if (pathName === RESET || pathName === VERIFY) {
    		const heading = pathName === RESET ? 'Reset Account' : 'Set Password'
			const line = pathName === RESET ? 'We will email you a link to reset your password.' : 'Please put your new password in both fields below.'
    		return (
    			<div className='sign-in-container'>
					<div className='right-panel'>
						<h2 className='right-title'>{heading}</h2>
						<p>{line}</p>
						{pathName === RESET && this.renderEmail}
						{pathName === VERIFY &&
							<div>
								{this.renderPassword('20px 0 0 0')}
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

			const buttonDisabled = signInButton === 'Register' ? (!didAgree || !name || !email) : false

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
								placeHolder='Full Name'
								value={name}
								id='name'
								name='name'
								type='text'
								handleChange={this.onInputChange}
							/>
						}
						{this.renderEmail()}
						{pathName === LOGIN && this.renderPassword('0 0 20px 0')}
						{pathName === REGISTER &&
							<div className='agree-row'>
								<input 
	                                className='checkbox'
	                                id='checkbox'
	                                type="checkbox" 
	                                onChange={this.handleAgree} 
	                                defaultChecked={didAgree}
	                            />
	                            <label 
	                                className='checkbox-label' 
	                                htmlFor="checkbox"
	                            ></label>
	                            <p className='mini'>I agree to the <Link to={PRIVACY} target='_blank' className='underline-button'>privacy policy</Link></p>
                            </div>
						}
						<div className='button-row'>
							<Button 
								title={signInButton}
								margin='10px 20px 10px 0'
								isDisabled={buttonDisabled}
								handleClick={this.onUserSubmit}
							/>
							<p>or</p>
							<FacebookLogin
						        appId={config.FACEBOOK_APP_ID}
						        fields='name,email,picture'
						        cssClass='custom-fb-button'
						        callback={this.responseFacebook}
						        disableMobileRedirect={true}
						    />
						</div>
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