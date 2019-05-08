import React from 'react';
import './EntryRow.css';
import ReactTooltip from 'react-tooltip'

const EntryRow = (props) => {

	const {
		selectEntry,
		delay,
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
					<div 
						className={`entry-row ${rowType}`}
					>
						<div className='top-left'>
							<div data-tip="Cantonese">
								<h3 className='hover-box'>{cantoword}</h3>
							</div>
							<ReactTooltip effect='solid'/>
							<div data-tip="Classifier" >
							<p className='hover-box'>{clLabel}{classifier}</p>
							</div>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<div data-tip="English" >
								<p className='hover-box'>En: {englishword}</p>
							</div>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<div data-tip="Jyutping" >
								<p className='hover-box'>{jyutping}</p>
							</div>
							<ReactTooltip effect="solid"/>
						</div>
						<div>
							<div data-tip="Mandarin" >
								<p className='hover-box'>普: {mandarinword}</p>
							</div>
							<ReactTooltip effect="solid"/>
						</div>
					</div>
				);
			} else {
				return (
					<div 
						className={`entry-row ${rowType} animate-pop-in`}
						style={{animationDelay: `${delay}s`}}
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
				<div 
					className={`entry-row ${rowType} animate-pop-in`}
					style={{animationDelay: `${delay}s`}}
				>
					<div className='top-left'>
						<div className='ghost-div'>&nbsp;</div>
						<div className='ghost-div'>&nbsp;</div>
					</div>
					<div><div className='ghost-div'>&nbsp;</div></div>
					<div><div className='ghost-div'>&nbsp;</div></div>
					<div><div className='ghost-div'>&nbsp;</div></div>
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