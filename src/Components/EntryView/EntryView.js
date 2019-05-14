import React, {Component} from 'react';
import './EntryView.css';
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { validateUser, serverError } from '../../Helpers/helpers';
import Icon from '../Icon/Icon';
import { setAlert } from '../../Components/PopUpAlert/actions';
import { setPrevRoute } from '../../Routing/actions';
import { routes } from '../../Routing/constants';
import apiRequest from '../../Helpers/apiRequest';

const mapStateToProps = state => {
	return {
		userID: state.user.user.userID,
		pathName: state.router.location.pathname,
		hash: state.router.location.hash,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		presentAlert: (alert) => dispatch(setAlert(alert)),
		updateURL: (path) => dispatch(push(path)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
	}
}

class EntryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFavorited: false,
			entry: ''
		}
	}

	componentDidMount() {
		const { hash } = this.props;
		if (hash) {
			this.getEntry(hash)
		}
	}

	componentDidUpdate(prevProps) {
		const { hash } = this.props;
		if (hash && prevProps.hash !== hash) {
			this.getEntry(hash)
		} else if (prevProps.hash !== hash) {
			this.setState({entry: ''})
		}
	}

	getEntry = (hash) => {
		const { userID } = this.props;
		const entryID = hash.slice(1, hash.length)
			apiRequest({
				endPoint: '/entryid',
				method: 'POST',
				body: {entryID} 
			})
			.then(entry => {
				if (entry.error) {
					serverError()
				} else {
					this.setState({entry})
					if (
						entryID != null &&
						validateUser(userID)
					) {
						this.checkIfFavorite(entryID, userID);
					}
				}
			})
			.catch(() => serverError())
	}

	checkIfFavorite = (entryID, userID) => {
		const { isFavorited } = this.state;
		apiRequest({
				endPoint: '/favorites/isFavorited',
				method: 'POST',
				body: {entryID, userID} 
			})
			.then(favorited => {
				if (favorited !== isFavorited) {
					this.setState({isFavorited: favorited})
				}
			})
	}

	toggleFavorite = (entryID, userID, cantoWord) => {
		const { 
			updateEntries,
			updateSelected, 
			presentAlert, 
			isFavoritePage,
			updateURL,
			pathName,
			setPrevRoute,
		} = this.props;
		const { LOGIN } = routes;
		if (validateUser(userID)) {
			apiRequest({
				endPoint: '/favorites/toggle',
				method: 'POST',
				body: {entryID, userID, cantoWord} 
			})
			.then(favorited => {
				if (favorited.error) {
					serverError()
				} else {
					this.setState({isFavorited: favorited})
					let title = '';
					let message = '';
					let icon = '';
					if (!favorited) {
						if (isFavoritePage) {
							updateEntries(userID)
							updateSelected('')
						}
						title = 'Favorite Removed'
						message = `"${cantoWord}" has been removed from your favorites.`
						icon = 'dislike-1'
					} else {
						title = 'Favorite Added'
						message = `"${cantoWord}" has been added to your favorites.`
						icon = 'like-2'
					}
					const alert = {
				        title,
				        message,
				        showAlert: true,
				        icon,
				    }
				    presentAlert(alert);
				}
			})
			.catch(err => serverError())
		} else {
			optionAlert({
			    title: 'Please sign in.',
			    message: 'You must be signed in to save favorites. Would you like to sign in or register now?',
			    buttons: [
			      {
			        label: 'Yes',
			        onClick: () => {
			        	setPrevRoute(pathName)
			        	updateURL(LOGIN)
			        }
			      },
			      {
			        label: 'No',
			        onClick: null
			      }
			    ]
		    })
		}
	}

	togglePlay = (entryID) => {
		const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/cantotalk-audio-clips/entryID_1.mp3')
		audio.play()		
	}

	render() {
		const { userID } = this.props;
		const {
			isFavorited,
			entry,
			entry: {
				entry_id,
				canto_word,
				classifier,
				jyutping,
				english_word,
				mandarin_word,
				canto_sentence,
				jyutping_sentence,
				english_sentence
			}
		} = this.state

		const clLabel = classifier ? 'cl: ' : '';

		return (
			<div className='entry-view'>
				{entry !== ''
					?   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<div data-tip="Toggle Favorite" >
									<button 
										className='entry-btn' 
										onClick={() => this.toggleFavorite(entry_id, userID, canto_word)}
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
								</div>
								<ReactTooltip effect='solid' delayShow={1000}/>
								<div data-tip="Play Audio Clip" >
									<button 
										className='entry-btn'
										onClick={() => this.togglePlay(entry_id)}
									>
										<Icon 
											icon='speaker-5' 
											iconSize='35' 
											iconStyle='dark'
										/>
									</button>
								</div>
								<ReactTooltip effect='solid' delayShow={1000}/>
							</div>
							<div className='top-group entry-section'>
								<div className='canto-class'>
									<h3>{canto_word}</h3>
									<p>{clLabel}{classifier}</p>
								</div>
								<div><p>{jyutping}</p></div>
							</div>
							<div className='entry-section'>
								<div><p>En: {english_word}</p></div>
								<div><p>普: {mandarin_word}</p></div>
							</div>
							<div className='entry-section'>
								<div><p>{canto_sentence}</p></div>
								<div><p>{jyutping_sentence}</p></div>
								<div><p>{english_sentence}</p></div>
							</div>
						</div>
					:   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div className='top-group entry-section'>
								<div className='canto-class'>
									<div className='ghost-div'>&nbsp;</div>
									<div className='ghost-div'>&nbsp;</div>
								</div>
								<div>
									<div className='ghost-div'>&nbsp;</div>
								</div>
							</div>
							<div className='entry-section'>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div className='entry-section'>
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