import React, { Component } from 'react';
import './DeckView.css';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import apiRequest from '../../Helpers/apiRequest';
import Deck from '../../Components/Deck/Deck';
import EntriesList from '../../Components/EntriesList/EntriesList';
import Button from '../../Components/Button/Button';
import { optionAlert } from '../OptionAlert/OptionAlert';
import { setLoading } from '../../Loading/actions';
import { setDeck, setDeckEntries } from './actions';
import { setAlert } from '../../Components/PopUpAlert/actions';
import { routes } from '../../Routing/constants';

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
	constructor(props) {
		super(props);
		this.state = {}
	}

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
		const { setLoading, setDeck } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/get-deck-by-id',
			method: 'POST',
			body: {deck_id} 
		})
			.then(data => {
				if (data && !data.error) {
					const deck = {...data};
					data.deck_name = deck.deck_name.charAt(0).toUpperCase() + deck.deck_name.slice(1);
					setDeck(data)
				}
				setLoading(false)
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	getDeckEntries = (deck_id) => {
		const { setLoading, setDeckEntries } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/deck-entries',
			method: 'POST',
			body: {deck_id} 
		})
			.then(data => {
				if (data && !data.error) {
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
		apiRequest({
			endPoint: '/delete-deck',
			method: 'POST',
			body: {deck_id} 
		})
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
									title='Start'
									buttonType='ghost' 
									color='var(--cantoPink)'
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
											color='var(--cantoWhite)'
											height='44px'
											width='100px'
											margin='20px 0'
											handleClick={()=>this.editDeck()}
										/>
										<Button 
											title='Delete'
											buttonType='ghost' 
											color='var(--cantoWhite)'
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