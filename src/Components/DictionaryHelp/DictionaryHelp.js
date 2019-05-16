import React, { Component } from 'react';
import './DictionaryHelp.css';
import MediaQuery from 'react-responsive';
import { togglePlay } from '../../Helpers/helpers';
import EntryRow from '../EntriesList/EntryRow/EntryRow';
import { demoEntry, initials, finals } from './jyutpingExamples';

class DictionaryHelp extends Component {
	constructor(props) {
		super(props);
		this.help = React.createRef();
		this.howToUse = React.createRef();
		this.entryRow = React.createRef();
		this.jyutping = React.createRef();
		this.initials = React.createRef();
		this.finals = React.createRef();
		this.tones = React.createRef();
		this.notes = React.createRef();
	}


	handleScroll = (ref) => {
		if (this[ref] != null) {
			this[ref].current.scrollIntoView({ behavior: 'smooth' })
		}
	}
	
	render() {
		return (
			<div className='dict-help' ref={this.help}>
				<MediaQuery minWidth={800}>
					<div className='directory'>
						<p 
							className='main'
							onClick={()=>this.handleScroll('howToUse')}
						>How to use</p>
						<p 
							className='sub'
							onClick={()=>this.handleScroll('entryRow')}
						>Contents</p>
						<p 
							className='main'
							onClick={()=>this.handleScroll('jyutping')}
						>Jyutping</p>
						<p 
							className='sub'
							onClick={()=>this.handleScroll('initials')}
						>Initials</p>
						<p 
							className='sub'
							onClick={()=>this.handleScroll('finals')}
						>Finals</p>
						<p 
							className='sub'
							onClick={()=>this.handleScroll('tones')}
						>Tones</p>
						<p 
							className='main'
							onClick={()=>this.handleScroll('notes')}
						>Extra Notes</p>
					</div>
				</MediaQuery>
				<div className='content'>
					<div ref={this.howToUse}>
						<h1>How do I use this dictionary?</h1>
						<div className='list-divider'></div>
						<p>This dictionary is designed around spoken Cantonese, and the day to day vocabulary that is regularly spoken among locals. You can start using the dictionary by navigating to the search page and using the search bar. The search bar can accept English, Mandarin, Jyutping, or Cantonese, making it easy to find translations. Once your search returns matching results, you will see translations like in the diagram below. Hover over the different sections of the key below to see what it all is!</p>
						<div ref={this.entryRow} className='row-diagram'>
							<EntryRow 
								entry={demoEntry} 
								isDemo={true} 
								className='demo-row'
							/>
						</div>  
					</div>
					<div className='list-divider'></div>
					<h2 ref={this.jyutping}>Jyutping (粵拼)</h2>
					<p>Jyutping is the form of romanization used in this dictionary to help learners read the characters correctly without having ever heard them before. In Jyutping, each chinese character is represented by a syllable consisting of possibly an initial consonant, a final syllabic vowel plus a possible ending consonant, and lastly, the tonal pitch represented with a number. Below are examples of the different syllable initial sounds and final sounds including the tones. Click on a row to hear how it sounds!</p>
					<h3 ref={this.initials}>Initials</h3>
					<div className='row-diagram'>
						{initials.map((ex, i) => {
							return (
								<div 
									key={i}
									className='example-row' 
									onClick={() => togglePlay(ex.entryID)}
								>
									<p>{ex.letter}</p>
									<p><strong>{ex.letter}</strong>{ex.example}</p>
									<p>{ex.canto}</p>
									<p>{ex.english}</p>
								</div>
							)
						})}
					</div>
					<h3 ref={this.finals}>Finals</h3>
					<div className='row-diagram'>
						{finals.map((ex, i) => {
							if (ex.divider) {
								return (
									<p key={i}>{ex.divider}</p>
								)
							} else {
								return (
									<div 
										key={i}
										className='example-row' 
										onClick={() => togglePlay(ex.entryID)}
									>
										<p>{ex.letter}</p>
										<p>{ex.initial}<strong>{ex.letter}</strong>{ex.tone}</p>
										<p>{ex.canto}</p>
										<p>{ex.english}</p>
									</div>
								)
							}
						})}
					</div>
					<div className='list-divider'></div>
					<h2 ref={this.tones}>Tones</h2>
					<div className='list-divider'></div>
					<h2 ref={this.notes}>Extra Notes</h2>
					<p>&#8226; You will occassionally find entries where an english word appears in the cantonese section. This is because locals actually use the english word in everyday language.</p>
					<p>&#8226; You will occassionally find entries where there is jyutping in the cantonese section. This is because there are no written words that represent what is being spoken.</p>
					<p>&#8226; An asterisk (*) next to a tonal number indicates that that tone is an exception to the usual tone given to that word.</p>
				</div>
			</div>
		);
	}	
}
export default DictionaryHelp;
