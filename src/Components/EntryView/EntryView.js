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
		}
	} = props;

	console.log(userID)

	let clLabel = 'cl: '

	if (!classifier) {
		clLabel = '';
	}

	// const renderLikeButton = () => {
	// 	fetch('http://localhost:3000')
	// 		//user a get to check for favorite
	// }

	const toggleFavorite = () => {
		console.log(entryID, userID, cantoword);
		fetch('http://localhost:3000/Favorites/toggle', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					entryid: entryID,
					userid: userID,
					cantoword: cantoword
				})
		})
			.then(data => data.json())
			.then(fav => {
				//do something
				console.log(fav);
			})
			.catch(err => console.log('unable to toggle favorite'))
	}

	return (
		<div className='entry-view'>
			{entry !== ''
				?   <div className='inner-entry-view'>
						<div className='entry-btn-container'>
							<button className='entry-btn' onClick={toggleFavorite}>
								<Icon 
									icon='like-2' 
									width='35' 
									iconStyle='dark'
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