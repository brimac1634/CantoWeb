import React, { Component } from 'react';
import './entry-row.styles.css';
import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip'
import Icon from '../icon/icon.component';

class EntryRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMark: false
		}
	}

	componentDidMount() {
		const { addedList, entry } = this.props;
		if (addedList) {
			const show = addedList.includes(entry.entry_id);
			this.setState({showMark: show});
		}
	}

	componentDidUpdate(prevProps) {
		const { addedList, entry } = this.props;
		if (prevProps.addedList !== addedList) {
			this.setState({showMark: addedList.includes(entry.entry_id)});
		}
	}

	onX = (e, entry) => {
		const { handleX } = this.props;
		handleX(entry)
		e.stopPropagation()
	}

	renderRow = () => {
		const {
			delay,
			entry,
			entry: {
				canto_word,
				classifier,
				jyutping,
				english_word,
				mandarin_word,
				progress
			},
			selectEntry,
			isDemo,
			isDisabled,
			showX
		} = this.props;
		const { showMark } = this.state;
		const clLabel = classifier ? 'cl: ' : '';
		const rowType = () => {
			if (isDemo) {
				return 'demo'
			} else if (isDisabled) {
				return 'disabled'
			} else {
				return 'real'
			}
		}
		const progressPer = progress * 100 / 10;
		const showProgress = Boolean(progress)
		const progressStyle = showProgress ? 'show-progress' : null;

		if (entry !== '') {
			if (isDemo) {
				return (
					<MediaQuery maxWidth={360}>
						{(matches) => {
							return  <div 
										className={`entry-row ${rowType()} ${matches && 'small-demo-row'}`}
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
						className={`entry-row ${rowType()} animate-pop-in ${progressStyle}`}
						style={{animationDelay: `${delay}s`}}
						onClick={selectEntry ? ()=>selectEntry(entry) : null}
					>
						<div className='top-left'>
							<h3>{canto_word}</h3>
							<p>{clLabel}{classifier}</p>
						</div>
						<div><p>En: {english_word}</p></div>
						<div><p>{jyutping}</p></div>
						<div><p>普: {mandarin_word}</p></div>
						{(showMark) &&
							<div className='mark-spot circle-mark'>&nbsp;</div>
						}
						{showProgress &&
							<div className='progress-container'>
								<p>{`${progressPer}%`}</p>
								<div className='progress-border'>
									<div 
										className='progress'
										style={{width: `${progressPer}%`}}
									></div>
								</div>
							</div>
						}
						{showX &&
							<div 
								className='mark-spot x-mark' 
								onClick={e=>this.onX(e, entry)}
							>
								<Icon icon='multiply' iconSize='18' color='cantoWhite'/>
							</div>
						}
					</div>
				);
			}
		} else {
			return (
				<div 
					className={`entry-row ${rowType()} animate-pop-in`}
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

	render() {
		return (
			<div>
				{this.renderRow()}
			</div>
		);
	}
}

export default EntryRow;