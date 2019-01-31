import React from 'react';
import './EntryView.css';
import Icon from '../Icon/Icon';

const EntryView = (props) => {
	const {
		entry,
		entry: {
			cantoword,
			classifier,
			jyutping,
			englishword,
			mandarinword,
			cantosentence,
			jyutpingsentence,
			englishsentence
		}
	} = props;

	let clLabel = 'cl: '

	if (!classifier) {
		clLabel = '';
	}

	return (
		<div className='entry-view'>
			{entry !== ''
				?   <div className='inner-entry-view'>
						<div className='entry-btn-container'>
							<Icon icon='like-2' width='35' iconStyle='dark'/>
							<Icon icon='speaker-5' width='35' iconStyle='dark'/>
						</div>
						<div>
							<div className='canto-class'>
								<h3>{cantoword}</h3>
								<p>{clLabel}{classifier}</p>
							</div>
							<div><p>{jyutping}</p></div>
						</div>
						<div>
							<div><p>En: {englishword}</p></div>
							<div><p>普: {mandarinword}</p></div>
						</div>
						<div>
							<div><p>{cantosentence}</p></div>
							<div><p>{jyutpingsentence}</p></div>
							<div><p>{englishsentence}</p></div>
						</div>
					</div>
				:   <div></div>}
		</div>
		
	);
}

export default EntryView;