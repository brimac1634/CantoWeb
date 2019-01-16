import React from 'react';
import './EntryRow.css';

const EntryRow = (props) => {
	return (
		<div className='entry-row'>
			<div className='top-left'>
				<h3>{props.cantoWord}</h3>
				<p>`cl: {props.classifier}`</p>
			</div>
			<p>`En: {props.englishWord}`</p>
			<p>{props.jyutping}</p>
			<p>`普: {props.mandarinWord}`</p>
		</div>
	);
}

export default EntryRow;