import React, { Component } from 'react';
import './AddNewEntry.css';
import { connect } from 'react-redux';
import { optionAlert } from '../OptionAlert/OptionAlert';
import MediaQuery from 'react-responsive';
import TextInput from '../../Components/TextInput/TextInput';
import Button from '../../Components/Button/Button';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';
import { push } from 'connected-react-router'
import { routes } from '../../Routing/constants';
import { updateObject, serverError } from '../../Helpers/helpers';

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
	    	if (newEntry[key] === '') {
	    		isComplete = false
	    		return
	    	}
	    })
	    if (isComplete) {
	    	this.setState({isComplete})
	    }
	}

	handleSubmit = (event) => {
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
			}
		})
		.catch(() => {
			setLoading(false)
			serverError()
		})
	    event.preventDefault();
	}

	

	render() {
		const { user } = this.props;
		const {
			newEntry: {
				canto_word,
			    jyutping,
			    classifier,
			    english_word,
			    mandarin_word,
			    canto_sentence,
			    jyutping_sentence,
			    english_sentence
			},
			isComplete
		} = this.state;

		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<div className='new-entry'>
						<div className='inner-new-entry'>
							<h2>Welcome, {user.userName}</h2>
					        <TextInput 
								placeHolder='Canto Word'
								margin='20px 0'
								height='44px'
								id='canto_word'
								value={canto_word}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='Jyutping'
								margin='20px 0'
								height='44px'
								id='jyutping'
								value={jyutping}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='Classifier'
								margin='20px 0'
								height='44px'
								id='classifier'
								value={classifier}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='English Word'
								margin='20px 0'
								height='44px'
								id='english_word'
								value={english_word}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='Mandarin Word'
								margin='20px 0'
								height='44px'
								id='mandarin_word'
								value={mandarin_word}
								handleChange={this.handleChange}
							/>
							<TextInput 
								isTextArea={true}
								placeHolder='Canto Sentence'
								margin='20px 0'
								height='150px'
								id='canto_sentence'
								value={canto_sentence}
								handleChange={this.handleChange}
							/>
							<TextInput 
								isTextArea={true}
								placeHolder='Jyutping Sentence'
								margin='20px 0'
								height='150px'
								id='jyutping_sentence'
								value={jyutping_sentence}
								handleChange={this.handleChange}
							/>
							<TextInput 
								isTextArea={true}
								placeHolder='English Sentence'
								margin='20px 0'
								height='150px'
								id='english_sentence'
								value={english_sentence}
								handleChange={this.handleChange}
							/>
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
