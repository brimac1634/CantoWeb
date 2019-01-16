import React from 'react';
import './EntryRow.css';

const EntryRow = (props) => {

	let clLabel = 'cl: '

	if (props.classifier === '') {
		clLabel = '';
	}

	return (
		<div className='entry-row'>
			<div className='top-left'>
				<h3>{props.cantoWord}</h3>
				<p>{clLabel}{props.classifier}</p>
			</div>
			<div><p>En: {props.englishWord}</p></div>
			<div><p>{props.jyutping}</p></div>
			<div><p>普: {props.mandarinWord}</p></div>
		</div>
	);
}

export default EntryRow;