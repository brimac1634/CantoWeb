import React from 'react';
import './EntriesList.css';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({ entries, selectEntry, isFavoritePage }) => {
	let ghostRows = [0,1,2,3,4,5,6]

	const getDelay = (i) => {
		const add = i * 0.1
		return 0 + add
	}

	return (
		<div className='entry-list'>
			{
				entries.length || isFavoritePage
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

export default EntryList;