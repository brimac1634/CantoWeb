import React, {Component} from 'react';
import './SignIn.css';
import Logo from '../Logo/Logo';

class SignIn extends Component {
	constructor(props) {
		super()
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

	onUserSubmit = () => {
		const { updateUser, removePopUpBegin } = this.props;
		const { title, email, password } = this.state;
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
				.then(user => {
					console.log(user)
					updateUser(user)
					removePopUpBegin()
				})

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
				.then(user => {
					updateUser(user)
					removePopUpBegin()
				})
				.catch(console.log)
		}
    }

	render() {
		const { title, signInButton, alternateButton} = this.state;
		return (
			<div className='sign-in-container'>
				<div className='logo-container'>
					<Logo />
				</div>
				<h2>{title}</h2>
				<label>Email</label>
				<input 
					className='sign-in-input input-field' 
					type='email'
					onChange={this.onEmailChange}
				/>
				<label>Password</label>
				<input 
					className='sign-in-input input-field' 
					type='password'
					onChange={this.onPasswordChange}
				/>
				<input 
					className='btn' 
					type='submit' 
					value={signInButton}
					onClick={this.onUserSubmit}
				/>
				<p 
					className='register' 
					onClick={() => this.signInToggle(alternateButton)}
				>
					{alternateButton}
				</p>
			</div>
		);
	}
}
export default SignIn;