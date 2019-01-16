import React from 'react';
import EntryRow from './EntryRow/EntryRow';
import {entriesHolder} from './EntryPlaceholder';

const EntryList = ({entries}) => {

	const placeholder = entriesHolder

	return (
		<div className='entry-list' style={{overflowY: 'auto'}}>
			{placeholder.map(entry => {
				return (
					<EntryRow 
						entryID={entry.entryID}
						cantoWord={entry.cantoWord}
						jyutping={entry.jyutping}
						classifier={entry.classifier}
						englishWord={entry.englishWord}
						mandarinWord={entry.mandarinWord}
					/>
				);
			})}
		</div>
	);
}

export default EntryList;