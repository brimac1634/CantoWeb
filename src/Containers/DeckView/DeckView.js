import React, { Component } from 'react';
import './DeckView.css';
import { connect } from 'react-redux';
import apiRequest from '../../Helpers/apiRequest';
import Deck from '../../Components/Deck/Deck';
import EntriesList from '../../Components/EntriesList/EntriesList';
import { setLoading } from '../../Loading/actions';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
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


	render() {
		const { deck, entries } = this.state;
		const { user_id, tags, users, name, description, date_created, is_public } = deck;
		const date = new Date(date_created);

		return (
			<div className='page dual-wrap over-flow'>
				<div className='half deck-details'>
					<div className='center-text'>
						<h2>Entries in this deck</h2>
					</div>
					<Deck deck={deck} isDisabled={true} />
					<div className='deck-info'>
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