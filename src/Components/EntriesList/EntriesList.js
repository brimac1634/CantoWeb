import React from 'react';
import EntryRow from './EntryRow/EntryRow';

const EntryList = ({entries}) => {

	return (
		<div className='entry-list' style={{overflowY: 'auto'}}>
			{entries.map(entry => {
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