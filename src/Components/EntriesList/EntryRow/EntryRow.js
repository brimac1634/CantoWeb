import React from 'react';
import './EntryRow.css';

const EntryRow = (props) => {

	const {
		selectEntry,
		entry,
		entry: {
			cantoword,
			classifier,
			jyutping,
			englishword,
			mandarinword
		}
	} = props;

	let clLabel = 'cl: '

	if (!classifier) {
		clLabel = '';
	}

	return (
		<div className='entry-row' onClick={() => selectEntry(entry)}>
			<div className='top-left'>
				<h3>{cantoword}</h3>
				<p>{clLabel}{classifier}</p>
			</div>
			<div><p>En: {englishword}</p></div>
			<div><p>{jyutping}</p></div>
			<div><p>普: {mandarinword}</p></div>
		</div>
	);
}

export default EntryRow;