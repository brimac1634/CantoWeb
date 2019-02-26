import React, {Component} from 'react';
import './EntryView.css';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

class EntryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFavorited: false
		}
	}

	render() {
		const {
			user:{
				id
			},
			entry,
			entry: {
				entryID,
				cantoword,
				classifier,
				jyutping,
				englishword,
				mandarinword,
				cantosentence,
				jyutpingsentence,
				englishsentence
			},
			updateEntries,
			updateSelected
		} = this.props;

		const { isFavorited } = this.state;

		let clLabel = 'cl: ';

		if (!classifier) {
			clLabel = '';
		}

		const checkIfFavorite = (entryID, userID) => {
			fetch('http://localhost:3000/Favorites/isFavorited', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					entryID: entryID,
					userID: userID
				})
			})
				.then(data => data.json())
				.then(favorited => {
					console.log(favorited)
					if (favorited !== isFavorited) {
						this.setState({isFavorited: favorited})
					}
				})
				.catch(err => console.log('Unable to check favorite'))
		}

		if (entryID != null && id != null) {
			checkIfFavorite(entryID, id)
		}

		const toggleFavorite = (entryID, userID, cantoWord) => {
			if (userID !== '') {
				fetch('http://localhost:3000/Favorites/toggle', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						entryid: entryID,
						userid: userID,
						cantoword: cantoWord
					})
				})
					.then(data => data.json())
					.then(result => {
						if (result === 'deleted') {
							updateEntries(userID)
							updateSelected('')
						}
						checkIfFavorite(entryID, userID)
					})
					.catch(err => console.log('Unable to toggle favorite'))
			} else {
				//present pop up "you must be signed in to favorite words"
			}
		}

		return (
			<div className='entry-view'>
				{entry !== ''
					?   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<button 
									className='entry-btn' 
									onClick={() => toggleFavorite(entryID, id, cantoword)}
								>
									<Icon 
										icon='like-2' 
										iconSize='35' 
										iconStyle='dark'
										color={
											isFavorited
											? 'cantoPink'
											: 'cantoDarkBlue'
										}
									/>
								</button>
								<button className='entry-btn'>
									<Icon 
										icon='speaker-5' 
										iconSize='35' 
										iconStyle='dark'
									/>
								</button>
							</div>
							<div className='top-group'>
								<div className='canto-class'>
									<h3>{cantoword}</h3>
									<p>{clLabel}{classifier}</p>
								</div>
								<div><p>{jyutping}</p></div>
							</div>
							<div>
								<div><p>En: {englishword}</p></div>
								<div><p>普: {mandarinword}</p></div>
							</div>
							<div>
								<div><p>{cantosentence}</p></div>
								<div><p>{jyutpingsentence}</p></div>
								<div><p>{englishsentence}</p></div>
							</div>
						</div>
					:   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<div className='ghost-div'/>
								<div className='ghost-div'/>
							</div>
							<div className='top-group'>
								<div className='canto-class'>
									<div className='ghost-div'>&nbsp;</div>
									<div className='ghost-div'>&nbsp;</div>
								</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
						</div>}
			</div>
			
		);
	}
	
}

export default connect(mapStateToProps)(EntryView);