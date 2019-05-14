import React, { Component } from 'react';
import './Contact.css';
import { validateEmail } from '../../Helpers/helpers';
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import HoverBox from '../HoverBox/HoverBox';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import apiRequest from '../../Helpers/apiRequest';

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

	handleChange = (event) => {
		const newMessage = { ...this.state.newMessage }
		const { id } = event.target
	    const { value } = event.target
	    newMessage[id] = value
	    this.setState({newMessage})
	}

	handleSubmit = (event) => {
		const { newMessage } = this.state;
		const verified = this.verifyDetails(newMessage)
		console.log(verified)
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
		return (
			<HoverBox>
				<div className='contact'>
					<div className='left-panel'>
						<h1 className='pink contact-h'>Dont Be A Stranger!</h1>
						<h1 className='contact-h'>Just say Hello.</h1>
						<p>Feel free to get in touch with us! Whether you need help with the application, or there is something you would like to see here, or just want to say hi, we are waiting to hear from you! 
						</p>
					</div>
					<div className='right-panel'>
					        <TextInput 
								placeHolder='Name'
								margin='10px 0'
								height='34px'
								id='name'
								value={this.state.name}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='Email Address'
								margin='10px 0'
								height='34px'
								id='email'
								// value={this.state.email}
								handleChange={this.handleChange}
							/>
							<TextInput 
								isTextArea={true}
								placeHolder='Your Message'
								margin='10px 0'
								height='150px'
								id='message'
								value={this.state.message}
								handleChange={this.handleChange}
							/>
							<Button 
								title='Send!'
								buttonType='ghost' 
								icon='paper-plane' 
								height='34px'
								margin='10px 0'
								handleClick={this.handleSubmit}
							/>
					</div>
				</div>
			</HoverBox>
		);
	}	
}
export default Contact;
