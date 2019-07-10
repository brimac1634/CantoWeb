import React, { Component } from 'react';
import './NewDeck.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { optionAlert } from '../OptionAlert/OptionAlert';
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
				tags 
			} 
		} = this.state;
		const { LEARN } = routes;
		
		if (step <= 1) {
			step += 1
			updateURL(`${pathName}#${step}`)
		} else if (step === 2) {
			setLoading(true);
			let entry_ids = entryList.map(entry => entry.entry_id)
			apiRequest({
				endPoint: '/new-deck',
				method: 'POST',
				body: {
					name: deckName,
					user_id: userID,
					is_public: isPublic,
					is_official: isOfficial,
					tags, 
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
				buttonMessage = 'Next: Add Entries'
				break
			case 1:
				buttonMessage = `Next: Confirm ${entryList.length} Entries`
				break
			case 2:
				buttonMessage = `Create Deck: ${deckName}`
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
					{step > 0 &&
						<div className='back-button'>
							<Button 
								title='Back'
								buttonType='ghost' 
								color='var(--cantoWhite)'
								height='44px'
								width='100px'
								margin='20px 0'
								handleClick={()=>this.back()}
							/>
						</div>
					}
					<p className='button-label'>{buttonMessage}</p>
					<Button 
						title={step === 2 ? 'Confirm' : 'Next'}
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