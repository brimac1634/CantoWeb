import React from 'react';
import './EntryView.css';
import Icon from '../Icon/Icon';

const EntryView = (props) => {
	const {
		userID,
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
	} = props;

	let clLabel = 'cl: ';
	let color = ''

	if (!classifier) {
		clLabel = '';
	}

	const renderLikeButton = (entryID, userID) => {
		console.log(entryID, userID);
		if (entryID !== undefined && userID !== '') {
			fetch('http://localhost:3000/Favorites/isFavorited', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					entryID: entryID,
					userID: userID
				})
			})
				.then(data => data.json())
				.then(isFavorited => {
					color = isFavorited ? 'cantoPink' : 'cantoDarkBlue'
				})
				.catch(err => console.log('Unable to check favorite'))
		}
	}

	const toggleFavorite = (entryID, userID, cantoWord) => {
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
			})
			.catch(err => console.log('Unable to toggle favorite'))
	}

	renderLikeButton(entryID, userID);

	return (
		<div className='entry-view'>
			{entry !== ''
				?   <div className='inner-entry-view'>
						<div className='entry-btn-container'>
							<button className='entry-btn' onClick={() => toggleFavorite(entryID, userID, cantoword)}>
								<Icon 
									icon='like-2' 
									width='35' 
									iconStyle='dark'
									color={color}
								/>
							</button>
							<button className='entry-btn'>
								<Icon icon='speaker-5' width='35' iconStyle='dark'/>
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

export default EntryView;