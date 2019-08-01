import React, { Component } from 'react';
import './add-new-entry.styles.css';
import { connect } from 'react-redux';
import { optionAlert } from '../../components/option-alert/option-alert.component';
import MediaQuery from 'react-responsive';
import TextInput from '../../components/text-input/text-input.component';
import Button from '../../components/button/button.component';
import apiRequest from '../../helpers/apiRequest';
import { setLoading } from '../../redux/loading/loading.actions';
import { push } from 'connected-react-router'
import { routes } from '../../redux/routing/routing.constants';
import { updateObject, serverError } from '../../helpers/helpers';
import fields from './add-new-entry.data';

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
			newEntry: {
				canto_word: '',
			    jyutping: '',
			    classifier: '',
			    english_word: '',
			    mandarin_word: '',
			    canto_sentence: '',
			    jyutping_sentence: '',
			    english_sentence: '',
			},
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
		const entry = { ...this.state.newEntry }
	    const newEntry = updateObject(event, entry)
	    this.setState({newEntry})
	    let isComplete = true;
	    Object.keys(newEntry).forEach(key => {
	    	const value = newEntry[key];
	    	if (value === '' && value !== 'classifier') {
	    		isComplete = false
	    	}
	    })
	    this.setState({isComplete})
	}

	handleSubmit = (event) => {
		if (this.state.isComplete) {
			const { setLoading } = this.props;
			const { newEntry } = this.state;
			setLoading(true)
			apiRequest({
				endPoint: '/add-entry',
				method: 'POST',
				body: newEntry 
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
				    let emptyEntry = { ...this.state.newEntry };
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
	    event.preventDefault();
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
							<h2>Welcome, {user.userName}</h2>
							{
								fields.fields.map(field => {
									return (
										<TextInput 
											key={field.id}
											placeHolder={field.name}
											margin='20px 0'
											height='44px'
											id={field.id}
											value={this.state[field.id]}
											handleChange={this.handleChange}
										/>
									)
								})
							}
							{
								fields.areas.map(field => {
									return (
										<TextInput 
											key={field.id}
											isTextArea={true}
											placeHolder={field.name}
											margin='20px 0'
											height='100px'
											id={field.id}
											value={this.state[field.id]}
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
