import React, { Component } from 'react';
import './dictionary-help.styles.css';
import MediaQuery from 'react-responsive';
import { audioRequest } from '../../helpers/audioRequest';
import { serverError } from '../../helpers/helpers';
import EntryRow from '../entry-row/entry-row.component';
import { demoEntry, directory, initials, finals, tones } from './dictionary-help.data';
import { SwapSpinner } from "react-spinners-kit";
import { isIOS } from "react-device-detect";

class DictionaryHelp extends Component {
	constructor(props) {
		super(props);
		this.help = React.createRef();
		directory.forEach(item => {
			this[item.ref] = React.createRef();
		})
		this.state = {
			isLoading: false
		}
	}


	handleScroll = (ref) => {
		if (this[ref] != null) {
			this[ref].current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	playAudio = (entryID) => {
		if (!isIOS) {
			this.setState({isLoading: true})
			audioRequest(entryID, true)
				.then(() => this.setState({isLoading: false}))
				.catch(()=>{
					this.setState({isLoading: false})
					serverError()
				})
		}
	}
	
	render() {
		const { isLoading } = this.state;
		return (
			<div>
				<div className='dict-help' ref={this.help}>
					<MediaQuery minWidth={800}>
						<div className='directory'>
							{directory.map((item, i)=>{
								return (
									<p 
										key={i}
										className={item.type}
										onClick={()=>this.handleScroll(item.ref)}
									>{item.name}</p>
								)
							})}
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
						<p>Jyutping is the form of romanization used in this dictionary to help learners read the characters correctly without having ever heard them before. In Jyutping, each chinese character is represented by a syllable consisting of possibly an initial consonant, a final syllabic vowel plus a possible ending consonant, and lastly, the tonal pitch represented with a number. Below are examples of the different syllable initial sounds and final sounds including the tones. {!isIOS && 'Click on a row to hear how it sounds!'}</p>
						<h3 ref={this.initials}>Initials</h3>
						<div className='row-diagram'>
							{initials.map((ex, i) => {
								return (
									<div 
										key={i}
										className='example-row' 
										onClick={() => this.playAudio(ex.entryID)}
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
										<p 
											key={i} 
											className='example-divider'
											ref={ex.ref ? this[ex.ref] : null}
										>{ex.divider}</p>
									)
								} else {
									return (
										<div 
											key={i}
											className='example-row' 
											onClick={() => this.playAudio(ex.entryID)}
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
						<p>Cantonese has six tones that can be idenitfied. To indicate the correct tone, jyutping uses number 1 through 6. {!isIOS && 'Click on the examples below to hear the difference between each tone...'}</p>
						{tones.map((ex, i) => {
								return (
									<div 
										key={i}
										className='example-row' 
										onClick={() => this.playAudio(ex.entryID)}
									>
										<p>{ex.tone}</p>
										<p>{ex.jyutping}<strong>{ex.tone}</strong></p>
										<p>{ex.canto}</p>
										<p>{ex.english}</p>
									</div>
								)
							})}
						<div className='list-divider'></div>
						<h2 ref={this.notes}>Extra Notes</h2>
						<p>&#8226; You will occassionally find entries where an english word appears in the cantonese section. This is because locals actually use the english word in everyday language.</p>
						<p>&#8226; You will occassionally find entries where there is jyutping in the cantonese section. This is because there are no written words that represent what is being spoken.</p>
						<p>&#8226; An asterisk (*) next to a tonal number indicates that that tone is an exception to the usual tone given to that word.</p>
					</div>
				</div>
				{isLoading &&
		            <div className='center-div absolute'>
		              <SwapSpinner
		                size={60}
		                color='#ff7a8a'
		                loading={isLoading}
		              />
		            </div>
		        }
			</div>
		);
	}	
}
export default DictionaryHelp;
