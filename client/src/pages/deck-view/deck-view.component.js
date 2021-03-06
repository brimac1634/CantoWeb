import React, { Component } from 'react';
import './deck-view.styles.css';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import apiRequest from '../../helpers/apiRequest';
import Deck from '../../components/deck/deck.component';
import EntriesList from '../../components/entries-list/entries-list.component';
import Button from '../../components/button/button.component';
import { optionAlert } from '../../components/option-alert/option-alert.component';
import { setLoading } from '../../redux/loading/loading.actions';
import { setDeck, setDeckEntries } from '../../redux/deck-view/deck-view.actions';
import { setAlert } from '../../redux/pop-up-alert/pop-up-alert.actions';
import { routes } from '../../redux/routing/routing.constants';

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    pathName: state.router.location.pathname,
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
		setDeck: (deck) => dispatch(setDeck(deck)),
		setDeckEntries: (deckEntries) => dispatch(setDeckEntries(deckEntries)),
	}
} 

class DeckView extends Component {
	componentDidMount() {
		const { pathName,updateURL } = this.props;
		const { DECK, LEARN } = routes;

		if (pathName === DECK) {
			const { search } = this.props;
			const values = queryString.parse(search)
			const deckID = values.deck
			if (deckID) {
				this.getDeckEntries(deckID);
				this.getDeck(deckID);
			} else {
				updateURL(LEARN)
			}
		}
	}

	getDeck = (deck_id) => {
		const { setLoading, setDeck, user: { userID } } = this.props;
		setLoading(true)
		apiRequest('POST', '/get-deck-by-id', {deck_id})
			.then(data => {
				if (data && !data.error) {
					const { user_id, is_public } = data;
					if (userID === user_id || is_public) {
						const deck = {...data};
						data.deck_name = deck.deck_name.charAt(0).toUpperCase() + deck.deck_name.slice(1);
						setDeck(data)
						setLoading(false)
					} else {
						const { updateURL } = this.props;
						const { LEARN } = routes;
						setLoading(false)
						optionAlert({
						    title: 'Oops!',
						    message: 'This deck belongs to another user and is not set to public.'
					    })
					    updateURL(LEARN)
					}
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	getDeckEntries = (deck_id) => {
		const { setLoading, setDeckEntries, user: { userID } } = this.props;
		setLoading(true)
		const endPoint = userID ? '/deck-entries-id' : '/deck-entries';
		const body = userID 
			? {deck_id, user_id: userID} 
			: {deck_id};
		apiRequest('POST', endPoint, body)
			.then(data => {
				if (data && !data.error) {
					console.log(data)
					setDeckEntries(data)
				}
				setLoading(false)
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	startDeck = () => {
		const { updateURL, deck: { deck_id } } = this.props;
		const { LEARN_GAME } = routes;
		updateURL(`${LEARN_GAME}?deck=${deck_id}`)
	}

	editDeck = () => {
		const { updateURL, search } = this.props;
		const { EDIT_DECK } = routes;
		updateURL(`${EDIT_DECK}${search}#0`)
	}

	deleteDeck = () => {
		const { deck } = this.props;
		optionAlert({
		    title: 'Delete Deck',
		    message: 'Are you sure you want to delete this deck? This cannot be undone.',
		    buttons: [
		      {
		        label: 'Yes',
		        onClick: ()=>this.handleDelete(deck)
		      },
		      { 
		        label: 'No',
		        onClick: null
		      }
		    ]
	    })
	}

	handleDelete = (deck) => {
		const { presentAlert, updateURL } = this.props;
		const { deck_id, deck_name } = deck;
		const { LEARN } = routes;
		setLoading(true)
		apiRequest('POST', '/delete-deck', {deck_id})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					const alert = {
				        title: 'Deck Deleted',
				        message: `Your deck, "${deck_name}", has been deleted.`,
				        showAlert: true,
				    }
				    presentAlert(alert);
				    updateURL(LEARN)
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	renderDeckView = () => {
		const { user, deck, deckEntries } = this.props;
		let { user_id, tags, users, name, description, date_created, is_public } = deck;
		is_public = is_public === '0' ? false : true;
		const date = new Date(date_created);

		if (Object.entries(deck).length) {
			return (
				<div className='dual-wrap'>
					<div className='half deck-details'>
						<div className='center-text'>
							<h2>Deck Details</h2>
						</div>
						<div className='deck-info'>
							<div className='center-left'>
								<Deck 
									deck={deck} 
									isDisabled={true} 
									margin='0' 
								/>
							</div>
							<div className='push-right text-right'>
								<Button 
									title='Play'
									buttonType='ghost' 
									color='var(--cantoWhite)'
									height='44px'
									width='100px'
									margin='10px 0'
									handleClick={()=>this.startDeck()}
								/>
								{user_id === user.userID &&
									<span>
										<Button 
											title='Edit Deck'
											buttonType='ghost' 
											color='var(--cantoDarkBlue)'
											textColor='var(--cantoWhite)'
											height='44px'
											width='100px'
											margin='20px 0'
											handleClick={()=>this.editDeck()}
										/>
										<Button 
											title='Delete'
											buttonType='ghost' 
											color='var(--cantoDarkBlue)'
											textColor='var(--cantoWhite)'
											height='44px'
											width='100px'
											margin='20px 0'
											handleClick={()=>this.deleteDeck()}
										/>
									</span>
								}
							</div>
						</div>
						<div className='center-left'>
							{user_id === 0
								?	<p><strong>CantoTalk Official Deck</strong></p>
								: 	<p><strong>Created by: </strong>{name}</p>
							}
							{user_id !== 0 && date &&
								<p><strong>Date created: </strong>{date.toDateString()}</p>
							}
							{tags &&
								<p><strong>tags: </strong>{tags}</p>
							}
							{user_id !== 0 && users &&
								<p><strong>Number of followers: </strong>{users}</p>
							}
							{is_public === true &&
								<p><strong>*This deck is public</strong></p>
							}
							{description &&
								<p><strong>Description: </strong>{description}</p>
							}
						</div>
					</div>
					<div className='half deck-entry-list'>
						<h2>Entries in this deck</h2>
						<EntriesList 
							entries={deckEntries}
							isDisabled={true}
						/>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div className='page over-flow-y'>
				{this.renderDeckView()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);