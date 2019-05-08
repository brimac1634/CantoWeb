import React from 'react';
import './EntriesList.css';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({ entries, selectEntry, searchKey, isFavoritePage }) => {
	let ghostRows = [0,1,2,3,4,5,6]
	let animate = 'animate-pop-in';

	return (
		<div className='entry-list'>
			{
				entries.length || isFavoritePage
				?   entries.map((entry, i) => {
						const add = i * 0.2
						const delay = 0.3 + add
						
						return (
							<EntryRow
								className={`${animate}`}
								delay={delay}
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