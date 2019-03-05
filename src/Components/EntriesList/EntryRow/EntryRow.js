import React from 'react';
import './EntryRow.css';
import ReactTooltip from 'react-tooltip'

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
		},
		isDemo,
	} = props;

	const clLabel = classifier ? 'cl: ' : '';
	const rowType = isDemo ? 'demo' : 'real';

	const renderRow = () => {
		if (entry !== '') {
			if (isDemo) {
				return (
					<div className={`entry-row ${rowType}`}>
						<div className='top-left'>
							<p data-tip="Cantonese" data-offset="{'top': -20}">
								<h3 className='hover-box'>{cantoword}</h3>
							</p>
							<ReactTooltip effect='solid'/>
							<p data-tip="Classifier" data-offset="{'top': -20}">
							<p className='hover-box'>{clLabel}{classifier}</p>
							</p>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<p data-tip="English" data-offset="{'top': -20}">
								<p className='hover-box'>En: {englishword}</p>
							</p>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<p data-tip="Jyutping" data-offset="{'top': -20}">
								<p className='hover-box'>{jyutping}</p>
							</p>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<p data-tip="Mandarin" data-offset="{'top': -20}">
								<p className='hover-box'>普: {mandarinword}</p>
							</p>
							<ReactTooltip effect="solid"/>
						</div>
					</div>
				);
			} else {
				return (
					<div 
						className={`entry-row ${rowType}`}
						onClick={() => selectEntry(entry)}
					>
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
		} else {
			return (
				<div className='entry-row ghost'>
					<div className='top-left'>
						<div className='ghost-div'>&nbsp;</div>
						<div className='ghost-div'>&nbsp;</div>
					</div>
					<div className='ghost-div'>&nbsp;</div>
					<div className='ghost-div'>&nbsp;</div>
					<div className='ghost-div'>&nbsp;</div>
				</div>
			);
		}
	}

	return (
		<div>
			{renderRow()}
		</div>
	);
}

export default EntryRow;