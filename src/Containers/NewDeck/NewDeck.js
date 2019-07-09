import React, { Component } from 'react';
import './NewDeck.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import MediaQuery from 'react-responsive';
import TextInput from '../../Components/TextInput/TextInput';
import EntriesList from '../../Components/EntriesList/EntriesList';
import apiRequest from '../../Helpers/apiRequest';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Button from '../../Components/Button/Button';
import { setLoading } from '../../Loading/actions';
import { updateObject } from '../../Helpers/helpers';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
  	searchKey: state.temp.searchKey,
  	searchType: state.temp.searchType,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: [],
			step: 0,
			searchComplete: false,
			deck: {
				deckName: '',
				isPublic: false,
				tags: '',
			}
		}
	}

	componentDidUpdate(prevProps) {
		const { searchKey } = this.props;
		if (prevProps.searchKey !== searchKey) {
			this.searchEntries(searchKey)
		}
	}

	searchEntries = (searchKey) => {
		const { setLoading, searchType } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/search',
			method: 'POST',
			body: {searchKey, searchType}
		})
			.then(data => {
				if (Array.isArray(data)) {
					this.setState({
						entries: data
					})
				} else {
					this.setState({
						entries: []
					})
				}
				this.setState({searchComplete: true})
				setLoading(false)
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	handleChange = (event) => {
		const deck = { ...this.state.deck }
	    const newDeck = updateObject(event, deck)
	    this.setState({deck: newDeck})
	}

	handlePublic = () => {
		const deck = { ...this.state.deck }
		deck.isPublic = !deck.isPublic;
		this.setState({deck});
	}

	next = () => {
		const { updateURL } = this.props;
		let { step } = this.state;
		step += 1
		this.setState({step})
		updateURL()
	}

	renderNewDeckForm = () => {
		const { deckName, tags, isPublic } = this.state.deck
		return (
			<div className='inner-new-entry'>
				<h2>New Deck Details</h2>
				<TextInput 
					placeHolder='Name of Deck'
					margin='20px 0'
					height='44px'
					id='deckName'
					value={deckName}
					handleChange={this.handleChange}
				/>
				<TextInput 
					placeHolder='Tags'
					margin='20px 0'
					height='44px'
					id='tags'
					value={tags}
					handleChange={this.handleChange}
				/>
				<div className='agree-row'>
					<input 
                        className='checkbox'
                        id='checkbox'
                        type="checkbox"
                        onChange={()=>this.handlePublic()} 
                        defaultChecked={isPublic}
                    />
                    <label 
                        className='checkbox-label' 
                        htmlFor="checkbox"
                    ></label>
                    <p className='make-public'>Make Public</p>
                </div>
                <div className='add-container'>
					<Button 
						title='Next!'
						buttonType='ghost' 
						height='44px'
						margin='20px 0'
						handleClick={()=>this.next()}
					/>
				</div>
			</div>
		)
	}


	render() {
		const { entries, step, searchComplete } = this.state;
		const translate = step * -100
		console.log(translate)
		return (
			<div className='page new-deck'>
				<div className='slide' style={{left: 0, transform: `translateX(${translate}%)`}}>
					{this.renderNewDeckForm()}
				</div>
				<div className='slide' style={{left: '100%', transform: `translateX(${translate}%)`}}>
					<div className='new-list-container'>
						<EntriesList 
							entries={entries}
							selectEntry={this.handleEntrySelect}
							searchComplete={searchComplete}
						/>
					</div>
					<div className='search-top'>
						<SearchBar />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);