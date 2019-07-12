import React, { Component } from 'react';
import './DeckView.css';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import apiRequest from '../../Helpers/apiRequest';
import Deck from '../../Components/Deck/Deck';
import EntriesList from '../../Components/EntriesList/EntriesList';
import Button from '../../Components/Button/Button';
import { setLoading } from '../../Loading/actions';
import { routes } from '../../Routing/constants';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
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

class DeckView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: {},
			entries: []
		}
	}

	componentDidMount() {
		const { hash } = this.props;
		const deckID = hash.slice(1, hash.length)
		this.getDeckEntries(deckID);
		this.getDeck(deckID);
	}

	getDeck = (deck_id) => {
		const { setLoading } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/get-deck-by-id',
			method: 'POST',
			body: {deck_id} 
		})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					this.setState({deck: data})
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	getDeckEntries = (deck_id) => {
		const { setLoading } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/deck-entries',
			method: 'POST',
			body: {deck_id} 
		})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					console.log(data)
					this.setState({entries: data})
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	startDeck = () => {
		console.log('hey')
	}

	editDeck = () => {
		const { updateURL, hash } = this.props;
		const { EDIT_DECK } = routes;
		updateURL(`${EDIT_DECK}#${hash}`);
	}

	render() {
		const { deck, entries } = this.state;
		const { user } = this.props;
		const { user_id, tags, users, name, description, date_created, is_public } = deck;
		const date = new Date(date_created);

		return (
			<div className='page dual-wrap over-flow'>
				<div className='half deck-details'>
					<div className='center-text'>
						<h2>Deck Details</h2>
					</div>
					<div className='deck-info'>
						<div className='center-left'>
							<Deck deck={deck} isDisabled={true} />
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
							{is_public &&
								<p><strong>*This deck is public</strong></p>
							}
							{description &&
								<p><strong>Description: </strong>{description}</p>
							}
						</div>
						<div className='text-right'>
							{user_id === user.userID &&
								<Button 
									title='Edit Deck'
									buttonType='ghost' 
									height='44px'
									width='100px'
									margin='20px 0'
									handleClick={()=>this.editDeck()}
								/>
							}
							<Button 
								title='Start'
								buttonType='ghost' 
								color='var(--cantoPink)'
								height='44px'
								width='100px'
								margin='10px 0'
								handleClick={()=>this.startDeck()}
							/>
						</div>
					</div>
				</div>
				<div className='half deck-entry-list'>
					<h2>Entries in this deck</h2>
					<EntriesList 
						entries={entries}
						isDisabled={true}
					/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);