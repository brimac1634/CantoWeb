import React, {Component} from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import {Link} from 'react-router-dom';
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { serverError } from '../../Helpers/helpers';
import Logo from '../../Components/Logo/Logo';
import Icon from '../../Components/Icon/Icon';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import DropDown from '../../Containers/DropDown/DropDown';
import Button from '../../Components/Button/Button';
import TextInput from '../../Components/TextInput/TextInput';
import ReactTooltip from 'react-tooltip'
import apiRequest from '../../Helpers/apiRequest';
import { setUser } from './actions';
import { setAlert } from '../../Components/PopUpAlert/actions';
import {setLoading} from '../../Loading/actions';

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
		const emailList = JSON.parse(localStorage.getItem('emailList'))
		if (emailList != null && emailList.length) {
			this.setState({
				initialEmailList: emailList,
				emailList
			})
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

	onEmailChange = (event) => {
		const email = event.target.value;
		const { initialEmailList } = this.state;
		this.setState({ email })
		// const emailList = initialEmailList.filter(item => {
		// 	return item.includes(email)
		// })
		// this.setState({emailList})
	}
	onPasswordChange = (event) => this.setState({ password: event.target.value })

	handleClose = () => {
		const { updateURL, prevRoute } = this.props;
		console.log(prevRoute)
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
		console.log(user)
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

		const emailIsValid = this.validateEmail(email);
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
						console.log(userData)
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
						setLoading(false)
					})

			} else {
				//register
				apiRequest({
					endPoint: '/register',
					method: 'POST',
					body: {email, password} 
				})
					.then(userData => {
						if (userData && userData.error != null) {
							serverError()
						} else {
							this.handleLogin(title, userData)
						}
						setLoading(false)
					})
					.catch(()=>serverError())
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
				{
					title === 'Login'
					?	<Controller>
							<Trigger>
								<div>
									<TextInput 
										icon='user-3' 
										margin='10px 0'
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
							margin='10px 0'
							placeHolder='Email Address'
							value={email}
							handleChange={this.onEmailChange}
						/>
				}
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