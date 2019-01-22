import React from 'react';
import './EntryRow.css';

const EntryRow = (props) => {

	const {
		selectEntry,
		entry,
		entry: {
			cantoWord,
			classifier,
			jyutping,
			englishWord,
			mandarinWord
		}
	} = props;

	let clLabel = 'cl: '

	if (classifier === '') {
		clLabel = '';
	}

	return (
		<div className='entry-row' onClick={() => selectEntry(entry)}>
			<div className='top-left'>
				<h3>{cantoWord}</h3>
				<p>{clLabel}{classifier}</p>
			</div>
			<div><p>En: {englishWord}</p></div>
			<div><p>{jyutping}</p></div>
			<div><p>普: {mandarinWord}</p></div>
		</div>
	);
}

export default EntryRow;