import React, {Component} from 'react';
import './SignIn.css';
import Logo from '../Logo/Logo';

class SignIn extends Component {
	constructor(props) {
		super()
		this.state = {
			email: '',
			password: '',
		}
	}

	onEmailChange = (event) => this.setState({ email: event.target.value })
	onPasswordChange = (event) => this.setState({ password: event.target.value })

	onUserSubmit = () => {
		const { title, updateUserID } = this.props;
		const { email, password } = this.state;
		if (title === 'Login') {
			//login

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
					console.log(user);
					updateUserID(user)
				})
				.catch(console.log)
			
		}
    }

	render() {
		const {signInToggle, title, signInButton, alternateButton} = this.props;

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
					onClick={() => signInToggle(alternateButton)}
				>
					{alternateButton}
				</p>
			</div>
		);
	}
	
}

export default SignIn;