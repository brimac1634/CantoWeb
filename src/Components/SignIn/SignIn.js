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
		}
	}

	transitionOut = () => {
		this.setState({
			fadeType: 'animate-fade-out',
			popType: 'animate-pop-out',
		})

		setTimeout(() => this.props.signInToggle('home'), 1100);
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
						<input className='sign-in-input input-field' type='email'/>
						<label>Password</label>
						<input className='sign-in-input input-field' type='password'/>
						<input className='btn' type='submit' value={signInButton}/>
						<p className='register' onClick={() => signInToggle(alternateButton)}>{alternateButton}</p>
					</div>
				</div>
			</div>
		);
	}
	
}

export default SignIn;