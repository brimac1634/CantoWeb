import React, {Component} from 'react';
import './entry-view.styles.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { optionAlert } from '../option-alert/option-alert.component';
import { validateUser, serverError } from '../../helpers/helpers';
import Icon from '../icon/icon.component';
import SpeakerButton from '../speaker-button/speaker-button.component';
import { setPrevRoute } from '../../redux/routing/routing.actions';
import { setLoading } from '../../redux/loading/loading.actions';
import { setMobileEntry } from '../../redux/search/search.actions';
import { routes } from '../../redux/routing/routing.constants';
import apiRequest from '../../helpers/apiRequest';

const mapStateToProps = state => {
	return {
		userID: state.user.user.userID,
		pathName: state.router.location.pathname,
		hash: state.router.location.hash,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (path) => dispatch(push(path)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setLoading: (loading) => dispatch(setLoading(loading)),
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
	}
}

class EntryView extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			isFavorited: false,
			entry: '',
		}
	}

	componentDidMount() {
		this._isMounted = true;
		const { hash } = this.props;
		if (hash) {
			this.getEntry(hash)
		}
	}

	componentDidUpdate(prevProps) {
		const { selectedEntry, userID, hash, setMobileEntry, pathName } = this.props;
		const { entry } = this.state;
		const { WORD_OF_THE_DAY, FAVORITES } = routes;
		if (prevProps.selectedEntry !== selectedEntry) {
			this.setState({entry: selectedEntry})
			if (pathName === FAVORITES) {
				this.setState({isFavorited: true})
			} else if (selectedEntry !== '' && validateUser(userID)) {
				this.setState({isFavorited: false})
				this.checkIfFavorite(selectedEntry.entry_id, userID);
			}
		} else if (hash && hash !== prevProps.hash) {
			this.getEntry(hash)
		} else if (pathName !== WORD_OF_THE_DAY && !hash && entry !== '') {
			this.setState({entry: ''})
			setMobileEntry('');
		} 
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getEntry = (hash) => {
		const { userID, setLoading } = this.props;
		const entryID = hash.slice(1, hash.length)
		setLoading(true)
		if (entryID != null && validateUser(userID)) {
			this.checkIfFavorite(entryID, userID);
		}

		apiRequest({
			endPoint: '/entryid',
			method: 'POST',
			body: {entryID} 
		})
		.then(entry => {
			setLoading(false)
			if (entry.error) {
				serverError()
			} else {
				this._isMounted && this.setState({entry})
			}
		})
		.catch(() => {
			setLoading(false)
			serverError()
		})
	}

	checkIfFavorite = (entryID, userID) => {
		const { setLoading } = this.props;
		const { isFavorited } = this.state;
		setLoading(true)
		apiRequest({
			endPoint: '/favorites/isFavorited',
			method: 'POST',
			body: {entryID, userID} 
		})
		.then(favorited => {
			setLoading(false)
			if (favorited !== isFavorited) {
				this._isMounted && this.setState({isFavorited: favorited})
			}
		})
		.catch(()=>setLoading(false))
	}

	toggleFavorite = (entryID, userID, cantoWord) => {
		const { 
			updateFavs,
			updateURL,
			pathName,
			setPrevRoute,
			setLoading,
		} = this.props;
		const { LOGIN, FAVORITES } = routes;
		if (validateUser(userID)) {
			setLoading(true)
			apiRequest({
				endPoint: '/favorites/toggle',
				method: 'POST',
				body: {entryID, userID, cantoWord} 
			})
			.then(favorited => {
				setLoading(false)
				if (favorited.error) {
					serverError()
				} else {
					this._isMounted && this.setState({isFavorited: favorited})
					if (pathName === FAVORITES) {
						updateFavs(userID, FAVORITES)
						if (!favorited) {
							updateURL(pathName)
						}
					}
				}
			})
			.catch(() => {
				setLoading(false)
				serverError()
			})
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

	render() {
		const { WORD_OF_THE_DAY } = routes;
		const { userID, pathName } = this.props;
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
		const isWOD = (pathName === WORD_OF_THE_DAY)

		return (
			<div className={`entry-view ${isWOD ? 'wod-view' : 'non-wod-view'}`}>
				{entry !== ''
					?   <div>
							{isWOD &&
								<div className='center-div'>
									<h2 className='wod-date'>{new Date(entry.date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
									</h2>
								</div>
							}
							<div className='inner-entry-view'>
							
								<div className='entry-btn-container'>
									<button 
										className='entry-btn entry-btn-active' 
										onClick={() => this.toggleFavorite(entry_id, userID, canto_word)}
									>
										{isFavorited
											?	<Icon 
													icon='like-2-full' 
													iconSize='35'
													color='cantoPink'
												/>
											:   <Icon 
													icon='like-2' 
													iconSize='35'
													color='cantoDarkBlue'
												/>
										}
									</button>
									<SpeakerButton entryID={entry_id} />
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