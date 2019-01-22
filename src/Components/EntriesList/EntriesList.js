import React from 'react';
import './EntryList.css';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({ entries, selectEntry }) => {

	return (
		<div className='entry-list'>
			{entries.map(entry => {
				return (
					<EntryRow 
						selectEntry={selectEntry}
						entry={entry}
					/>
				);
			})}
		</div>
	);
}

export default EntryList;