import React, { Component } from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import TextInput from '../../Components/TextInput/TextInput';
import { connectionError } from '../../Helpers/helpers';
import { optionAlert } from '../OptionAlert/OptionAlert';
import HoverBox from '../../Components/HoverBox/HoverBox';
import Button from '../../Components/Button/Button';
import { push } from 'connected-react-router'
import { routes } from '../../Routing/constants';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';
import { setUser } from '../SignIn/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
		updateURL: (path) => dispatch(push(path)),
		updateUser: (user) => dispatch(setUser(user)),
	}
}

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
		}
	}

	verifyDeletion = (event) => {
		const { password } = this.state;
		if (password.length) {
			optionAlert({
			    title: 'Account Deletion',
			    message: 'Are you sure you want to delete your account and all your saved data?',
			    buttons: [
			    	{
			    		label: 'Yes',
				        onClick: () => this.handleDelete()
			    	},
			    	{
			    		label: 'No',
				        onClick: () => {}
			    	},
			    ]
		    })
		} else {
			optionAlert({
			    title: 'Password Needed',
			    message: 'Your password is required to delete your account.',
		    })
		}
		
	    event.preventDefault();
	}

	handleDelete = () => {
		const { 
			user: {
				userEmail
			}, 
			updateUser, 
			setLoading, 
			updateURL 
		} = this.props;
		const { password } = this.state;
		const { SEARCH } = routes;
		setLoading(true)
		apiRequest({
			endPoint: '/delete-account',
			method: 'POST',
			body: {userEmail, password} 
		})
			.then(res => {
				setLoading(false)
				if (res && res.error != null) {
					const { title, message } = res.error;
					optionAlert({title, message})
				} else {
					updateUser('');
					localStorage.setItem('user', '');
					optionAlert({
					    title: 'Account Deleted',
					    message: 'Your user account has successfully been deleted.',
					    buttons: [
					    	{
					    		label: 'Okay',
						        onClick: () => updateURL(SEARCH)
					    	},
					    ]
				    })
				}
			})
			.catch(() => {
				setLoading(false)
				connectionError()
			})
	}

	onPasswordInput = (event) => {
		this.setState({password: event.target.value})
	}

	render() {
		const { updateURL, user: { userName } } = this.props;
		const { RESET } = routes;
		const { password } = this.state;
		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<HoverBox>
						<div className='profile'>
							<div className='profile-inner'>
								<h2>Hello, {userName}!</h2>
								<div className='section'>
									<p><strong>Want to reset your password?</strong></p>
									<p>You will need to verify your email to reset your password.</p>
									<Button 
										title='Reset'
										buttonType='ghost' 
										icon='shuffle' 
										height='44px'
										margin='0'
										width='100px'
										handleClick={()=>updateURL(RESET)}
									/>
								</div>
								<div className='section'>
									<p><strong>Wish to delete you account?</strong></p>
									<p>Type your password, hit delete, and follow the prompt. Beware! This will delete your account and any saved data related to your account.</p>
									<div className='row'>
										<TextInput 
											icon='locked-4'
											placeHolder='Password'
											value={password}
											margin='0 5px 0 0'
											height='44px'
											name='password'
											type='password'
											id='password'
											handleChange={this.onPasswordInput}
										/>
										<Button 
											title='Delete'
											buttonType='ghost' 
											icon='multiply' 
											height='44px'
											margin='0'
											handleClick={this.verifyDeletion}
										/>
									</div>
								</div>
							</div>
						</div>
					</HoverBox>
				)}}
			</MediaQuery>
		);
	}	
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
