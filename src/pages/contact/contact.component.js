import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { optionAlert } from '../../components/option-alert/option-alert.component';
import TextInput from '../../components/text-input/text-input.component';
import Button from '../../components/button/button.component';

import { validateEmail, serverError, updateObject } from '../../helpers/helpers';
import apiRequest from '../../helpers/apiRequest';

import { setLoading } from '../../redux/loading/loading.actions';

import './contact.styles.scss';

const mapStateToProps = state => {
	return {
		prevRoute: state.prevRoute.route,
		user: state.user.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
		updateURL: (path) => dispatch(push(path)),
	}
}

class Contact extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newMessage: {
				name: '',
				email: '',
				message: ''
			}
		}
	}

	componentDidMount() {
		const { user } = this.props;
		if (user != null) {
			this.setState({
				newMessage: {
					name: '',
					email: user.userEmail,
					message: '',
				}
			});
		}
	}

	handleChange = (event) => {
	    const message = { ...this.state.newMessage }
	    const newMessage = updateObject(event, message)
	    this.setState({newMessage})
	}

	handleSubmit = (event) => {
		const { newMessage } = this.state;
		const { setLoading, updateURL, prevRoute } = this.props;
		const verified = this.verifyDetails(newMessage)
		if (verified) {
			setLoading(true)
			apiRequest({
				endPoint: '/contact-us',
				method: 'POST',
				body: newMessage 
			})
			.then(res => {
				setLoading(false)
				if (res.error) {
					serverError()
				} else {
					optionAlert({
					    title: 'Message Sent',
					    message: 'Your message has been sent! We will reply to you ASAP.',
					    buttons: [
					      {
					        label: 'Okay!',
					        onClick: () => {
					        	updateURL(prevRoute)
					        }
					      },
					    ]
				    })
				}
			})
			.catch(() => {
				setLoading(false)
				serverError()
			})
		}
	    event.preventDefault();
	}

	verifyDetails = (details) => {
		const { email } = details;
		let incomplete = Object.keys(details).some(key => {
			return details[key] === ''
		})
		if (incomplete) {
			optionAlert({
			    title: 'Incomplete',
			    message: 'Oops, the form is not yet complete!',
		    })
			return false
		} else if (!validateEmail(email)) {
			optionAlert({
			    title: 'Incorrect Email',
			    message: 'Hmm, your email address doesn\'t look quite right.',
		    })
			return false
		} else {
			return true
		}
		
	}

	render() {
		const { name, email, message } = this.state.newMessage;
		const first = 'Dont Be A Stranger!';
		const second = 'Just say Hello.';

		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<div className='contact-page'>
						<div className='contact'>
							<div className='panel'>
								<MediaQuery minWidth={361}>
									<h1 className='heading pink'>{first}</h1>
									<h1 className='heading'>{second}</h1>
								</MediaQuery>
								<MediaQuery maxWidth={360}>
									<h2 className='heading pink'>{first}</h2>
									<h2 className='heading'>{second}</h2>
								</MediaQuery>
								<p>Feel free to get in touch with us! Whether you need help with the application, or there is something you would like to see here, or just want to say hi, we are waiting to hear from you! 
								</p>
							</div>
							<div className='panel'>
							        <TextInput 
										placeHolder='Name'
										margin='10px 0'
										height={matches ? '44px' : '34px'}
										id='name'
										value={name}
										handleChange={this.handleChange}
									/>
									<TextInput 
										placeHolder='Email Address'
										margin='10px 0'
										height={matches ? '44px' : '34px'}
										id='email'
										value={email}
										handleChange={this.handleChange}
									/>
									<TextInput 
										isTextArea={true}
										placeHolder='Your Message'
										margin='10px 0'
										height='150px'
										id='message'
										value={message}
										handleChange={this.handleChange}
									/>
									<Button 
										title='Send!'
										buttonType='ghost' 
										icon='paper-plane' 
										height={matches ? '44px' : '34px'}
										margin='10px 0'
										handleClick={this.handleSubmit}
									/>
							</div>
						</div>
					</div>
				)}}
			</MediaQuery>
		);
	}	
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
