import React from 'react';
import './EntryView.css';

const EntryView = (props) => {
	const {
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
		<div className='entry-view'>
			{entry !== ''
				? <div className='inner-entry-view'>
						<div>
							<div className='canto-class'>
								<h3>{cantoWord}</h3>
								<p>{clLabel}{classifier}</p>
							</div>
							<div><p>{jyutping}</p></div>
						</div>
						<div>
							<div><p>En: {englishWord}</p></div>
							<div><p>普: {mandarinWord}</p></div>
						</div>
						<div>
							<div><p>This is a filler sentence</p></div>
							<div><p>This is a filler sentence</p></div>
							<div><p>This is a filler sentence</p></div>
						</div>
					</div>
				: <div></div>}
		</div>
		
	);
}

export default EntryView;