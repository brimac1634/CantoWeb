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
  	pathName: state.router.location.pathname,
    hash: state.router.location.hash,
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
				isOfficial: false,
				tags: '',
			},
			entryList: []
		}
	}

	componentDidMount() {
		const { pathName, hash, updateURL } = this.props;
		if (hash) {
			updateURL(`${pathName}#${0}`)
		}
	}

	componentDidUpdate(prevProps) {
		const { searchKey, hash } = this.props;
		if (prevProps.hash !== hash) {
			this.setState({step: Number(hash.slice(1, hash.length))})
		}
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

	handlePublic = (event) => {
		const deck = { ...this.state.deck }
		deck[event.target.id] = !deck[event.target.id];
		this.setState({deck});
	}

	next = () => {
		const { updateURL, pathName } = this.props;
		let { step } = this.state;
		step += 1

		updateURL(`${pathName}#${step}`)
	}

	handleEntrySelect = (entry) => {
		const { entryList } = this.state;
		let i = entryList.length;
		if (i < 1) {
			entryList.push(entry);
			this.setState({entryList})
		} else {
			while (i--) {
				if (entryList[i].entry_id === entry.entry_id) {
					return;
				}	
			}
			entryList.push(entry);
			this.setState({entryList})
		}
	}

	renderNewDeckForm = () => {
		const { user: { userEmail } } = this.props;
		const { isOfficial, deck: { deckName, tags, isPublic } } = this.state
		 
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
					<p className='button-label'>Make Public</p>
					<input 
                        className='checkbox'
                        id='isPublic'
                        type="checkbox"
                        onChange={this.handlePublic} 
                        defaultChecked={isPublic}
                    />
                    <label 
                        className='checkbox-label' 
                        htmlFor="isPublic"
                    ></label>
                </div>
                {userEmail === 'brimac1634@gmail.com' &&
                	<div className='agree-row'>
                		<p className='button-label'>CantoTalk Official</p>
						<input 
	                        className='checkbox'
	                        id='isOfficial'
	                        type="checkbox"
	                        onChange={this.handlePublic} 
	                        defaultChecked={isOfficial}
	                    />
	                    <label 
	                        className='checkbox-label' 
	                        htmlFor="isOfficial"
	                    ></label>
	                </div>
            	}
			</div>
		)
	}


	render() {
		const { entries, step, searchComplete, entryList, deck: { deckName } } = this.state;
		const translate = step * -100
		let buttonMessage;
		switch(step) {
			case 0:
				buttonMessage = 'Add Entries'
				break
			case 1:
				buttonMessage = `Add ${entryList.length} Entries`
				break
			case 2:
				buttonMessage = `Create ${deckName} Deck!`
				break
			default:
				buttonMessage = ''
		}

		return (
			<div className='page new-deck'>
				<div className='slide' style={{left: 0, transform: `translateX(${translate}%)`}}>
					{this.renderNewDeckForm()}
				</div>
				<div className='slide' style={{left: '100%', transform: `translateX(${translate}%)`}}>
					<h2 className='slide-title'>Add to your new deck!</h2>
					{step === 1 &&
						<div className='new-list-container'>
							<EntriesList 
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchComplete={searchComplete}
							/>
						</div>
					}
					<div className='search-top'>
						<SearchBar />
					</div>
				</div>
				<div className='slide' style={{left: '200%', transform: `translateX(${translate}%)`}}>
					<h2 className='slide-title'>Review your new deck!</h2>
					{step === 2 &&
						<div className='new-list-container'>
							<EntriesList 
								entries={entryList}
								selectEntry={this.handleEntrySelect}
							/>
						</div>
					}
					<div className='search-top'>
						<SearchBar hideSearch={true} />
					</div>
				</div>
				<div className='bottom-container'>
					<p className='button-label'>{buttonMessage}</p>
					<Button 
						title='Next'
						buttonType='ghost' 
						color='var(--cantoWhite)'
						height='44px'
						width='100px'
						margin='20px 0'
						handleClick={()=>this.next()}
					/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);