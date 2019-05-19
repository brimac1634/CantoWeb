import React, {Component} from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { serverError, validateEmail } from '../../Helpers/helpers';
import MediaQuery from 'react-responsive';
import Logo from '../../Components/Logo/Logo';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import DropDown from '../../Containers/DropDown/DropDown';
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
			email: '',
			password: '',
			failCount: 0,
			emailList: [],
		}
	}

	componentDidMount() {
		const { LOGIN, REGISTER } = routes;
		const { pathName } = this.props;
		if (pathName === LOGIN) {
			this.setState({
				title: 'Login',
				signInButton: 'Sign In',
				alternateButton: 'register',
			})

			const emailList = JSON.parse(localStorage.getItem('emailList'))
			if (emailList != null && emailList.length) {
				this.setState({
					initialEmailList: emailList,
					emailList
				})
			}
		} else if (pathName === REGISTER) {
			this.setState({
				title: 'Register',
				signInButton: 'Register',
				alternateButton: 'sign in',
			})
		}
		
	}


	signInToggle = (type) => {
		const { updateURL } = this.props;
		const { LOGIN, REGISTER } = routes;
		if (type === 'sign in') {
			updateURL(LOGIN)
		} else if (type === 'register') {
			updateURL(REGISTER)
		}
	}

	onEmailChange = (event) => {
		const email = event.target.value;
		const { initialEmailList } = this.state;
		this.setState({ email })
		
		if (initialEmailList) {
			const emailList = initialEmailList.filter(item => item.includes(email))
			this.setState({emailList})
		}
	}
	onPasswordChange = (event) => this.setState({ password: event.target.value })

	validatePassword = (password) => {
		return password.length >= 6 ? true : false;
	}

	handleUpdateUser = (user) => {
		const { userEmail } = user;
		const { updateUser } = this.props;
		localStorage.setItem('user', JSON.stringify(user));
		let emailList = JSON.parse(localStorage.getItem('emailList'))
		if (emailList != null) {
			if (!emailList.includes(userEmail)) {
				emailList.unshift(userEmail)
				if (emailList.length > 3) {
					emailList.pop()
				}
			}
		} else {
			emailList = [userEmail]
		}
		localStorage.setItem('emailList', JSON.stringify(emailList));
		updateUser(user);
	}

	createUser = (userData) => {
		return {
			userID: userData.id,
			userEmail: userData.email,
		}
	}

	onUserSubmit = () => {
		const { title, email, password, failCount } = this.state;
		const { setLoading } = this.props;
		const emailIsValid = validateEmail(email);
		const passwordIsValid = this.validatePassword(password);
		if (!emailIsValid && !passwordIsValid) {
			optionAlert({
				    title: 'Invalid Credentials',
				    message: 'The information you have entered is incorrect.',
			    })
		} else if (!emailIsValid) {
			optionAlert({
				    title: 'Invalid Email Address',
				    message: 'The email address you have entered is incomplete.',
			    })
		} else if (!passwordIsValid) {
			optionAlert({
				    title: 'Invalid Password',
				    message: 'The password you have entered is incomplete. Please note that passwords must contain at least 6 characters.',
			    })
		} else {
			setLoading(true)
			if (title === 'Login') {
				//login
				apiRequest({
					endPoint: '/signin',
					method: 'POST',
					body: {email, password} 
				})
					.then(userData => {
						setLoading(false)
						if (userData && userData.error != null) {
							const { name } = userData.error;
							if (name === 'ServerError') {
								serverError()
							} else if (name === 'ValidationError') {
								this.setState({
									failCount: failCount + 1
								})
								if (failCount <= 2) {
									optionAlert({
									    title: 'Invalid Credentials',
									    message: 'The information you have entered does not match our records.',
								    })
								} else {
									this.setState({failCount: 0})
									optionAlert({
									    title: 'Invalid Credentials',
									    message: 'The information you have entered does not match our records. Would you like to register?',
									    buttons: [
									    	{
									    		label: 'Yes',
										        onClick: () => this.signInToggle('register')
									    	},
									    	{
									    		label: 'No',
										        onClick: () => null
									    	},
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
						serverError()
					})
			} else {
				//register
				apiRequest({
					endPoint: '/register',
					method: 'POST',
					body: {email, password} 
				})
					.then(userData => {
						setLoading(false)
						if (userData && userData.error != null) {
							serverError()
						} else {
							this.handleLogin(title, userData)
						}
					})
					.catch(()=>{
						setLoading(false)
						serverError()
					})
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

    emailSelect = (email) => this.setState({email})

	render() {
		const { title, email, signInButton, alternateButton, emailList} = this.state;
		const { LOGIN } = routes;
		const { pathName } = this.props;

		const first = pathName === LOGIN ? 'Welcome Back!' : 'Welcome to CantoTalk!'
		const second = pathName === LOGIN ? 'We\'re happy to see you' : 'But Why Register?'
		const message = pathName === LOGIN
			? 'Don\'t forget to use your CantoTalk profile to its fullest by keeping track of learned words and practicing with the flash card desk!'
			: 'Creating a profile allows you to keep track of your previous searches, save favorites, build your own flash card decks, and more! This will also make it possible to sync information between devices. '
		return (
			<HoverBox>
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
					<div className='right-panel'>
						<Logo iconSize='50px' />
						<h2 className='right-title'>{title}</h2>
						{
							pathName === LOGIN
							?	<Controller>
									<Trigger>
										<div className='center-div'>
											<TextInput 
												icon='user-3' 
												margin='10px 0 0 0'
												placeHolder='Email Address'
												value={email}
												handleChange={this.onEmailChange}
											/>
										</div>
									</Trigger>
									<DropDown 
										list={emailList} 
										handleSelection={this.emailSelect}
									/>
								</Controller>
							:   <TextInput 
									icon='user-3' 
									margin='0'
									placeHolder='Email Address'
									value={email}
									id='email'
									handleChange={this.onEmailChange}
								/>
						}
						<TextInput 
							icon='locked-4' 
							margin='20px 0'
							placeHolder='Password'
							isPassword='true'
							handleChange={this.onPasswordChange}
						/>
						<Button 
							buttonType='ghost' 
							title={signInButton}
							margin='0 0 30px 0'
							handleClick={this.onUserSubmit} 
						/>
						<div className='bottom-row'>
							<p className='mini'>Forgot your password?</p>
							<p 
								className='underline-button' 
								onClick={() => this.signInToggle(alternateButton)}
							>reset</p>
						</div>
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
					</div>
				</div>
			</HoverBox>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);