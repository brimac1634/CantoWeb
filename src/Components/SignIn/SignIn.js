import React, {Component} from 'react';
import './SignIn.css';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';


class SignIn extends Component {
	constructor(props) {
		super()
		this.state = {
			fadeType: 'animate-fade-in',
			popType: 'animate-pop-in',
			email: '',
			password: '',
		}
	}

	transitionOut = () => {
		this.setState({
			fadeType: 'animate-fade-out',
			popType: 'animate-pop-out',
		})
		setTimeout(() => this.props.signInToggle('home'), 1100);
	}

	onEmailChange = (event) => this.setState({ email: event.target.value })
	onPasswordChange = (event) => this.setState({ password: event.target.value })

	onUserSubmit = () => {
		const { title } = this.props;
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
					//do something
				})
			
		}
    }

	render() {
		const {signInToggle, title, signInButton, alternateButton} = this.props;
		return (
			<div className={`shade-background ${this.state.fadeType}`}>
				<div className={`sign-in-box ${this.state.popType}`}>
					<button className='close' onClick={this.transitionOut}>
						<Icon 
							icon='multiply' 
							iconStyle='dark' 
							width='15'
						/>
					</button>
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
						<p className='register' onClick={() => signInToggle(alternateButton)}>{alternateButton}</p>
					</div>
				</div>
			</div>
		);
	}
	
}

export default SignIn;