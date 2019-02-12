import React from 'react';
import './EntryList.css';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({ entries, selectEntry }) => {

	return (
		<div className='entry-list'>
			{
				entries.length
				?   entries.map(entry => {
						return (
							<EntryRow
								key={entry.entryID}
								selectEntry={selectEntry}
								entry={entry}
							/>
						);
					})
					
				:   <div className='center-div'><h3>Try a new search...</h3></div>
				
			}
		</div>
	);
}

export default EntryList;