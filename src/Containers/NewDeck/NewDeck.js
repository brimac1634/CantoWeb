import React, { Component } from 'react';
import './NewDeck.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { optionAlert } from '../OptionAlert/OptionAlert';
import MediaQuery from 'react-responsive';
import TextInput from '../../Components/TextInput/TextInput';
import EntriesList from '../../Components/EntriesList/EntriesList';
import apiRequest from '../../Helpers/apiRequest';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Button from '../../Components/Button/Button';
import { routes } from '../../Routing/constants';
import { setLoading } from '../../Loading/actions';
import { updateObject, connectionError } from '../../Helpers/helpers';
import { setAlert } from '../../Components/PopUpAlert/actions';


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
		presentAlert: (alert) => dispatch(setAlert(alert)),
	}
} 

class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: [],
			step: 0,
			pop: false,
			searchComplete: false,
			isEditing: false,
			deck: {
				deckName: '',
				isPublic: false,
				isOfficial: false,
				tags: '',
				description: ''
			},
			entryList: [],
			addedIDList: {}
		}
	}

	componentDidMount() {
		const { pathName, hash, updateURL } = this.props;
		const { EDIT_DECK } = routes;

		if (pathName === EDIT_DECK) {
			this.setState({isEditing: true})
		}
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
		const { 
			updateURL, 
			presentAlert, 
			setLoading, 
			pathName, 
			user: { 
				userID 
			} 
		} = this.props;

		let { 
			step, 
			entryList, 
			deck: { 
				deckName, 
				isPublic, 
				isOfficial, 
				tags,
				description 
			} 
		} = this.state;
		const { LEARN } = routes;
		
		if (step <= 1 && deckName) {
			step += 1
			updateURL(`${pathName}#${step}`)
		} else if (step === 2) {
			setLoading(true);
			let entry_ids = entryList.map(entry => entry.entry_id)
			apiRequest({
				endPoint: '/new-deck',
				method: 'POST',
				body: {
					deck_name: deckName,
					user_id: userID,
					is_public: isPublic ? '1' : '0',
					is_official: isOfficial,
					tags,
					description, 
					entry_ids
				}
			})
				.then(data => {
					if (data && data.error != null) {
						const { title, message } = data.error;
						optionAlert({
						    title,
						    message
					    })
					} else {
						const alert = {
					        title: 'Deck Created',
					        message: `Your new deck, "${deckName}", is now created`,
					        showAlert: true,
					    }
					    presentAlert(alert);
					    updateURL(LEARN)
					}
					setLoading(false)
				})
				.catch(err=>{
					setLoading(false)
					connectionError()
				})
		}
	}

	back = () => {
		const { updateURL, pathName } = this.props;
		let { step } = this.state;
		step -= 1
		updateURL(`${pathName}#${step}`)
	}

	handleEntrySelect = (entry) => {
		const { entryList } = this.state;
		let i = entryList.length;

		const addEntry = (list, entryToAdd) => {
			list.push(entryToAdd);
			this.setState({list})
			this.popNumber();
		}

		if (i < 1) {
			addEntry(entryList, entry);
		} else {
			while (i--) {
				if (entryList[i].entry_id === entry.entry_id) {
					entryList.splice(i, 1);
					this.setState({entryList})
					this.popNumber();
					return;
				}	
			}
			addEntry(entryList, entry);
		}
	}

	popNumber = () => {
		this.setState({pop: true})
		setTimeout(()=>this.setState({pop: false}), 500)
	}

	renderNewDeckForm = () => {
		const { user: { userEmail } } = this.props;
		const { deckName, tags, isPublic, description, isOfficial } = this.state.deck;
		const { isEditing } = this.state;
		const message = isEditing ? 'Edit Deck Details' : 'New Deck Details';
		return (
			<MediaQuery maxWidth={699}>
				{(matches) => {
					return 	(
						<div className='inner-new-entry'>
							{matches 
								? <h3>{message}</h3>
								: <h2>{message}</h2>
							}
							<TextInput 
								placeHolder='Name of Deck'
								margin='20px 0'
								height='44px'
								id='deckName'
								value={deckName}
								handleChange={this.handleChange}
							/>
							<TextInput 
								placeHolder='Tags (optional)'
								margin='20px 0'
								height='44px'
								id='tags'
								value={tags}
								handleChange={this.handleChange}
							/>
							<TextInput 
								isTextArea={true}
								placeHolder='Description (optional)'
								margin='20px 0'
								height='100px'
								id='description'
								value={description}
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
				}}
			</MediaQuery>
		)
	}


	render() {
		const { entries, step, searchComplete, pop, entryList, isEditing, deck: { deckName } } = this.state;
		const translate = step * -100
		const popClass = pop ? 'pop' : null;
		let addedList;
		if (entryList) {
			addedList = entryList.map(entry => entry.entry_id);
		}

		let buttonMessage;
		switch(step) {
			case 0:
				buttonMessage = isEditing ? 'Next: Edit Entries' : 'Next: Add Entries'
				break
			case 2:
				buttonMessage = isEditing ? `Update Deck: "${deckName}"` : `Create Deck: "${deckName}"`
				break
			default:
				buttonMessage = ''
		}
		return (
			<MediaQuery maxWidth={699}>
				{(matches) => {
					return 	(
						<div className='page new-deck'>
							<div className='slide over-flow' style={{left: 0, transform: `translateX(${translate}%)`}}>
								{this.renderNewDeckForm()}
							</div>
							<div className='slide over-flow' style={{left: '100%', transform: `translateX(${translate}%)`}}>
								{matches 
									? 	<div className='slide-title'>
											<h3>Add to your new deck!</h3>
										</div>
									: <h2 className='slide-title'>Add to your new deck!</h2>
								}
								{step === 1 &&
									<div className='new-list-container'>
										<EntriesList 
											entries={entries}
											selectEntry={this.handleEntrySelect}
											searchComplete={searchComplete}
											addedList={addedList}
										/>
									</div>
								}
								<div className='search-top'>
									<SearchBar />
								</div>
							</div>
							<div className='slide over-flow last-slide' style={{left: '200%', transform: `translateX(${translate}%)`}}>
								{step === 2 &&
									<div className='new-list-container'>
										<EntriesList 
											entries={entryList}
											isDisabled={true}
										/>
									</div>
								}
								<div className='search-top'>
									<SearchBar hideSearch={true} />
								</div>
								{matches 
									? 	<div className='slide-title'>
											<h3>Review your new deck!</h3>
										</div>
									: <h2 className='slide-title'>Review your new deck!</h2>
								}
							</div>
							<div className='bottom-container'>
								{step > 0 &&
									<div className='back-button'>
										<Button 
											title='Back'
											buttonType='ghost' 
											color='var(--cantoWhite)'
											height='44px'
											width={matches ? '65px' : '100px'}
											margin={matches ? '5px 0' : '20px 0'}
											handleClick={()=>this.back()}
										/>
									</div>
								}
								{step === 1 
									?	<div className='row'>
											<p>Next: Confirm{` `}</p>
											<p className={`left-marg ${popClass}`}>{entryList.length}</p> 
											<p className='button-label left-marg'>{` `}Entries</p>
										</div>
									: 	<p className='button-label'>{buttonMessage}</p>
								}
								<Button 
									title={step === 2 ? 'Confirm' : 'Next'}
									buttonType='ghost' 
									color='var(--cantoWhite)'
									height='44px'
									isDisabled={!deckName}
									width={matches ? '65px' : '100px'}
									margin={matches ? '5px 0' : '20px 0'}
									handleClick={()=>this.next()}
								/>
							</div>
						</div>
					)
				}}
			</MediaQuery>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);