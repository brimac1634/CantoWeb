import React, {Component} from 'react';
import './EntryView.css';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
import { setAlert } from '../../Components/PopUpAlert/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		presentAlert: (alert) => dispatch(setAlert(alert)),
	}
}

class EntryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFavorited: false,
		}
	}

	render() {
		const {
			user:{
				userID
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
			updateSelected,
			presentAlert,
			isFavoritePage
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
					if (favorited !== isFavorited) {
						this.setState({isFavorited: favorited})
					}
				})
				.catch(err => console.log('Unable to check favorite'))
		}

		if (entryID != null && userID != null) {
			checkIfFavorite(entryID, userID);
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
					.then(favorited => {
						this.setState({isFavorited: favorited})
						let title = '';
						let message = '';
						if (!favorited) {
							if (isFavoritePage) {
								updateEntries(userID)
								updateSelected('')
							}
							title = 'Removed'
							message = `"${cantoWord}" has been removed from your favorites.`
						} else {
							title = 'Added'
							message = `"${cantoWord}" has been added to your favorites.`
						}
						const alert = {
					        title: title,
					        message: message,
					        showAlert: true,
					    }
					    presentAlert(alert);
					})
					.catch(err => console.log('Unable to toggle favorite'))
			} else {
				//present pop up "you must be signed in to favorite words"
			}
		}

		const togglePlay = (entryID) => {
			console.log('playing')
			const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/cantotalk-audio-clips/entryID_1.mp3')
			audio.play()
			console.log('stopped')
		}

		return (
			<div className='entry-view'>
				{entry !== ''
					?   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<button 
									className='entry-btn' 
									onClick={() => toggleFavorite(entryID, userID, cantoword)}
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
								<button 
									className='entry-btn'
									onClick={() => togglePlay(entryID)}
								>
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryView);