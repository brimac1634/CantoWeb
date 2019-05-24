import React, { Component } from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import TextInput from '../../Components/TextInput/TextInput';
import { serverError } from '../../Helpers/helpers';
import { optionAlert } from '../OptionAlert/OptionAlert';
import HoverBox from '../../Components/HoverBox/HoverBox';
import Button from '../../Components/Button/Button';
import { push } from 'connected-react-router'
import { routes } from '../../Routing/constants';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
		updateURL: (path) => dispatch(push(path)),
	}
}

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			user: {
				userName: '',
				userEmail: '',
				userID: ''
			}
		}
	}

	componentDidMount() {
		const { user } = this.props;
		if (user != null) {
			this.setState({user});
		}
	}

	submitDelete = (event) => {
		const { userID } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/contact-us',
			method: 'POST',
			body: userID 
		})
		.then(res => {

		})
		.catch(() => {
			setLoading(false)
			serverError()
		})
	    event.preventDefault();
	}

	handleDelete = () => {
		this.setState({isDeleting: true})
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
											handleClick={this.handleDelete}
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
