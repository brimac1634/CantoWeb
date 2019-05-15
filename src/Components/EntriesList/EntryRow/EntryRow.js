import React from 'react';
import './EntryRow.css';
import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip'

const EntryRow = (props) => {

	const {
		selectEntry,
		delay,
		entry,
		entry: {
			canto_word,
			classifier,
			jyutping,
			english_word,
			mandarin_word
		},
		isDemo,
	} = props;

	const clLabel = classifier ? 'cl: ' : '';
	const rowType = isDemo ? 'demo' : 'real';

	const renderRow = () => {
		if (entry !== '') {
			if (isDemo) {
				return (
					<MediaQuery maxWidth={360}>
						{(matches) => {
							return  <div 
										className={`entry-row ${rowType} ${matches && 'small-demo-row'}`}
									>
										<div className='top-left'>
											<div data-tip="Cantonese">
												<h3 className='hover-box'>{canto_word}</h3>
											</div>
											<ReactTooltip effect='solid'/>
											<div data-tip="Classifier" >
											<p className='hover-box'>{clLabel}{classifier}</p>
											</div>
											<ReactTooltip effect="solid"/>
										</div>
										<div>
											<div data-tip="English" >
												<p className='hover-box'>En: {english_word}</p>
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
												<p className='hover-box'>普: {mandarin_word}</p>
											</div>
											<ReactTooltip effect="solid"/>
										</div>
									</div>
						}}
					</MediaQuery>
				);
			} else {
				return (
					<div 
						className={`entry-row ${rowType} animate-pop-in`}
						style={{animationDelay: `${delay}s`}}
						onClick={() => selectEntry(entry)}
					>
						<div className='top-left'>
							<h3>{canto_word}</h3>
							<p>{clLabel}{classifier}</p>
						</div>
						<div><p>En: {english_word}</p></div>
						<div><p>{jyutping}</p></div>
						<div><p>普: {mandarin_word}</p></div>
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