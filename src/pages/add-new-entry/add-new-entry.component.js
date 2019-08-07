import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { optionAlert } from '../../components/option-alert/option-alert.component';
import TextInput from '../../components/text-input/text-input.component';
import Button from '../../components/button/button.component';

import apiRequest from '../../helpers/apiRequest';
import { setLoading } from '../../redux/loading/loading.actions';
import { routes } from '../../redux/routing/routing.constants';
import { serverError } from '../../helpers/helpers';
import fields from './add-new-entry.data';

import './add-new-entry.styles.scss';

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

class AddNewEntry extends Component {
	constructor(props) {
		super(props)
		this.state = {
			canto_word: '',
		    jyutping: '',
		    classifier: '',
		    english_word: '',
		    mandarin_word: '',
		    canto_sentence: '',
		    jyutping_sentence: '',
		    english_sentence: '',
			isComplete: false
		}
	}

	componentDidMount() {
		const { user: { userEmail }, updateURL } = this.props;
		const { SEARCH } = routes;
		if (userEmail !== 'brimac1634@gmail.com' ) {
			updateURL(SEARCH)
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
	    this.setState({ [name]: value }, ()=>{
	    	let isComplete = true;
		    Object.keys(this.state).forEach(key => {
		    	const value = this.state[key];
		    	if (value === '' && key !== 'classifier') {
		    		isComplete = false
		    	}
		    })
		    this.setState({isComplete})
	    })
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.isComplete) {
			const { setLoading } = this.props;
			const newEntry = this.state;
			setLoading(true)
			apiRequest({
				endPoint: '/add-entry',
				method: 'POST',
				body: this.state 
			})
			.then(entryData => {
				setLoading(false)
				if (entryData && entryData.error != null) {
					const { title, message } = entryData.error;
					optionAlert({
					    title,
					    message
				    })
				} else {
					optionAlert({
					    title: `Entry "${newEntry.canto_word}" Added!`,
					    message: 'The entry has been successfully added to the dictionary.'
				    })
				    let emptyEntry = { ...this.state };
				    Object.keys(emptyEntry).forEach(key => {
				    	emptyEntry[key] = '';
				    })
				    this.setState({newEntry: emptyEntry});
				}
			})
			.catch(() => {
				setLoading(false)
				serverError()
			})
		}
	}

	

	render() {
		const { user } = this.props;
		const { isComplete } = this.state;

		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<div className='new-entry'>
						<div className='inner-new-entry'>
							<h2 className='heading'>Welcome, {user.userName}</h2>
							{
								fields.fields.map(({name, required, id}) => {
									return (
										<TextInput 
											key={id}
											placeholder={name}
											margin='20px 0'
											height='44px'
											name={id}
											value={this.state[id]}
											handleChange={this.handleChange}
										/>
									)
								})
							}
							{
								fields.areas.map(({name, required, id}) => {
									return (
										<TextInput 
											key={id}
											isTextArea={true}
											placeholder={name}
											margin='20px 0'
											height='100px'
											name={id}
											value={this.state[id]}
											handleChange={this.handleChange}
										/>
									)
								})
							}
							<div className='add-container'>
								<Button 
									title='Add Entry!'
									buttonType='ghost' 
									icon='add' 
									height='44px'
									margin='20px 0'
									isDisabled={!isComplete}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddNewEntry);
