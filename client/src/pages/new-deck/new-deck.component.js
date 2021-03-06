import React, { Component } from 'react';
import './new-deck.styles.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import MediaQuery from 'react-responsive';
import { optionAlert } from '../../components/option-alert/option-alert.component';
import EntryRow from '../../components/entry-row/entry-row.component';
import TextInput from '../../components/text-input/text-input.component';
import EntriesList from '../../components/entries-list/entries-list.component';
import apiRequest from '../../helpers/apiRequest';
import SearchBar from '../../components/search-bar/search-bar.component';
import Button from '../../components/button/button.component';
import { routes } from '../../redux/routing/routing.constants';
import { setLoading } from '../../redux/loading/loading.actions';
import { setPrevRoute } from '../../redux/routing/routing.actions';
import { updateObject, connectionError, isEmptyObject } from '../../helpers/helpers';
import { setAlert } from '../../redux/pop-up-alert/pop-up-alert.actions';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
  	searchKey: state.temp.searchKey,
  	searchType: state.temp.searchType,
  	pathName: state.router.location.pathname,
    hash: state.router.location.hash,
    search: state.router.location.search,
    deck: state.deck.deck,
    deckEntries: state.deck.deckEntries,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setLoading: (loading) => dispatch(setLoading(loading)),
		presentAlert: (alert) => dispatch(setAlert(alert)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
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
				deck_id: '',
				deckName: '',
				isPublic: false,
				isOfficial: false,
				tags: '',
				description: ''
			},
			entryList: []
		}
	}

	componentDidMount() {
		const { pathName, hash, updateURL, user, deck, search } = this.props;
		const { LOGIN, EDIT_DECK, LEARN, DECK } = routes;

		if (isEmptyObject(user)) {
			if (search) {
				setPrevRoute(`${pathName}${search}${hash}`)
			} else {
				setPrevRoute(`${pathName}${hash}`)
			}
			updateURL(LOGIN)	
		} else if (pathName === EDIT_DECK) {
			if (!isEmptyObject(deck)) {
				this.setDeckToEdit(deck)
			} else {
				if (search) {
					updateURL(`${DECK}${search}`)
				} else {
					updateURL(LEARN)
				}
			}
		}
					
		if (hash && hash !== '#0') {
			updateURL(`${pathName}#0`)
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

	setDeckToEdit = (deck) => {
		const { deckEntries } = this.props;
		const {
			deck_id,
			deck_name,
			is_public,
			tags,
			description,
			user_id
		} = deck;
		
		const newDeck = {
			deck_id,
			deckName: deck_name,
			isPublic: is_public === '0' ? false : true,
			isOfficial: user_id === 0 ? true : false,
			tags: tags || '',
			description: description || ''
		}
		this.setState({
			isEditing: true,
			entryList: deckEntries,
			deck: newDeck 
		})
	}

	searchEntries = (searchKey) => {
		const { setLoading, searchType } = this.props;
		setLoading(true)
		apiRequest('POST', '/search', {searchKey, searchType})
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

	notEnoughMessage = () => {
		optionAlert({
		    title: 'Not Enough Entries',
		    message: 'You must have at least 5 entries added to your deck before proceeding!'
	    })
	}

	next = () => {
		const { 
			updateURL, 
			presentAlert, 
			setLoading, 
			pathName, 
			search,
			user: { 
				userID 
			} 
		} = this.props;

		let { 
			step, 
			entryList, 
			deck: { 
				deck_id,
				deckName, 
				isPublic, 
				isOfficial, 
				tags,
				description 
			} 
		} = this.state;
		const { LEARN } = routes;
		
		if (step <= 1 && deckName) {
			if (step === 1 && entryList.length < 5) {
				this.notEnoughMessage()
			} else {
				step += 1
				updateURL(`${pathName}${search}#${step}`)
			}
		} else if (step === 2) {
			if (entryList.length < 5) {
				this.notEnoughMessage()
			} else {
				setLoading(true);
				let entry_ids = entryList.map(entry => entry.entry_id)
				apiRequest({
					endPoint: '/new-deck',
					method: 'POST',
					body: {
						deck_id,
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
							let title, message;
							if (deck_id) {
								title = 'Deck Updated'
								message = `Your deck, "${deckName}", has been updated!`
							} else {
								title = 'Deck Created'
								message = `Your new deck, "${deckName}", has been created!`
							}
							const alert = {
						        title,
						        message,
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
	}

	back = () => {
		const { updateURL, pathName, search } = this.props;
		let { step } = this.state;
		step -= 1
		updateURL(`${pathName}${search}#${step}`)
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
		const { isEditing } = this.state;
		const { deckName, tags, isPublic, description, isOfficial } = this.state.deck;
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
			                        checked={isPublic}
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
				                        checked={isOfficial}
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
		const { isEditing, entries, step, searchComplete, pop, entryList, deck: { deckName } } = this.state;
		const translate = step * -100
		const popClass = pop ? 'pop' : null;
		let addedList;
		if (entryList) {
			addedList = entryList.map(entry => entry.entry_id);
		}
		let buttonMessage;
		let title;
		let title2;
		switch(step) {
			case 0:
				buttonMessage = isEditing ? 'Next: Edit Entries' : 'Next: Add Entries'
				break;
			case 1:
				title = isEditing ? 'Need to edit your deck?' : 'Add to your new deck!'
				title2 = 'Entries added'
				break;
			case 2:
				buttonMessage = isEditing ? `Update Deck: "${deckName}"` : `Create Deck: "${deckName}"`
				title = isEditing ? 'Review the updated entries' : 'Review your new deck!'
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
								<div className='list-flex'>
									<div className='new-list-container'>
										{matches 
											? 	<div className='slide-title'>
													<h3>{title}</h3>
												</div>
											: <h2 className='slide-title'>{title}</h2>
										}
										<div className='list-search'>
											{step === 1 &&
												<EntriesList 
													entries={entries}
													selectEntry={this.handleEntrySelect}
													searchComplete={searchComplete}
													addedList={addedList}
												/>
											}
											<div className='search-top'>
												<SearchBar />
											</div>
										</div>
									</div>
									{!matches &&
										<div className='new-list-container'>
											{matches 
												? 	<div className='slide-title'>
														<h3>{title2}</h3>
													</div>
												: <h2 className='slide-title'>{title2}</h2>
											}
											<div className='list-search'>
												{entryList.map(entry=>{
													return (
														<EntryRow
															key={entry.entry_id}
															handleX={this.handleEntrySelect}
															entry={entry}
															showX={true}
															isDisabled={true}
														/>
													)
												})}
											</div>
										</div>
									}
								</div>
							</div>
							<div className='slide over-flow last-slide' style={{left: '200%', transform: `translateX(${translate}%)`}}>
								{step === 2 &&
									<div className='list-flex'>
										<div className='new-list-container'>
											<div className='list-search-no-search'>
												{entryList.map(entry=>{
													return (
														<EntryRow
															key={entry.entry_id}
															handleX={this.handleEntrySelect}
															entry={entry}
															showX={true}
															isDisabled={true}
														/>
													)
												})}
											</div>
										</div>
									</div>
								}
								{matches 
									? 	<div className='slide-title'>
											<h3>{title}</h3>
										</div>
									: <h2 className='slide-title'>{title}</h2>
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