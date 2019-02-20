import React from 'react';
import './EntriesList.css';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({ entries, selectEntry, searchKey, isFavoritePage }) => {
	let ghostRows = [0,1,2,3,4,5,6]
	return (
		<div className='entry-list'>
			{
				searchKey.length || isFavoritePage
				?   entries.map(entry => {
						return (
							<EntryRow
								key={entry.entryID}
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
							/>
						);
					})
							
				
			}
		</div>
	);
}

export default EntryList;