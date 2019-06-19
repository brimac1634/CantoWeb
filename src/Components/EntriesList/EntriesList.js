import React from 'react';
import './EntriesList.css';
import EntryRow from './EntryRow/EntryRow';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { routes } from '../../Routing/constants';

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (url) => dispatch(push(url)),
	}
} 

const EntryList = ({ entries, selectEntry, search, updateURL }) => {
	let ghostRows = [0,1,2,3,4,5,6]

	const getDelay = (i) => {
		const add = i * 0.1
		return 0 + add
	}

	const renderMessage = () => {
		const { CONTACT } = routes;
		if (search.length && entries.length === 0) {
			return (
				<div className='vertical'>
					<p className='no-match'>Don't see what you're looking for?<br/>Request for it to be added!</p>
					<Button 
						title='Request Word'
						buttonType='ghost'
						margin='10px 5px'
						handleClick={()=>updateURL(CONTACT)}
					/>
				</div>
			)
		}
	}

	return (
		<div className='entry-list'>
			{renderMessage()}
			{
				entries.length || search.length
				?   entries.map((entry, i) => {
						return (
							<EntryRow
								delay={getDelay(i)}
								key={entry.entry_id}
								selectEntry={selectEntry}
								entry={entry}
							/>
						);
					})
					
				:   ghostRows.map(i => {
						return (
							<EntryRow
								key={i}
								entry=''
								delay={getDelay(i)}
							/>
						);
					})
			}

		</div>
	);
}

export default connect(null, mapDispatchToProps)(EntryList);