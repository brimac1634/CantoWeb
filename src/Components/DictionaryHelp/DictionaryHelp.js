import React from 'react';
import './DictionaryHelp.css';
import { togglePlay } from '../../Helpers/helpers';
import EntryRow from '../EntriesList/EntryRow/EntryRow';
import Icon from '../Icon/Icon';
import { initials, finals } from './jyutpingExamples';

const DictionaryHelp = () => {

	const demoEntry = {
		entry_id: 0,
		canto_word: '嗜好',
		classifier: '個 go3',
		jyutping: 'si3 hou3',
		english_word: 'hobby',
		mandarin_word: '爱好',
		canto_sentence: '我嘅嗜好係可以周圍去旅行。',
		jyutping_sentence: 'ngo5 ge3 si3 ho3 hai6 ho2 yi5 zau1 wai4 heoi3 leoi5 hang4.',
		english_sentence: 'My hobby is travelling on the weekend.',
	}

	return (
		<div className='dict-help'>
			<h1>How do I use this dictionary?</h1>
			<div className='list-divider'></div>
			<p>This dictionary is designed around spoken Cantonese, and the day to day vocabulary that is regularly spoken among locals. You can start using the dictionary by navigating to the search page and using the search bar. The search bar can accept English, Mandarin, Jyutping, or Cantonese, making it easy to find translations. Once your search returns matching results, you will see translations like in the diagram below. Hover over the different sections of the key below to see what it all is!</p>
			<div className='row-diagram'>
				<EntryRow 
					entry={demoEntry} 
					isDemo={true} 
					className='demo-row'
				/>
			</div>  
			<div className='list-divider'></div>
			<h2>Jyutping (粵拼)</h2>
			<p>Jyutping is the form of romanization used in this dictionary to help learners read the characters correctly without having ever heard them before. In Jyutping, each chinese character is represented by a syllable consisting of possibly an initial consonant, a final syllabic vowel plus a possible ending consonant, and lastly, the tonal pitch represented with a number. To show an example, let's look at "玩" (to play)...</p>
			<div className='row-diagram group-row'>
				<h3>Waan2</h3>
				<button 
					className='entry-btn'
					onClick={() => togglePlay(45)}
				>
					<Icon 
						icon='speaker-5' 
						iconSize='35' 
						iconStyle='dark'
					/>
				</button>
			</div>
			<p>Below are examples of the different syllable initial sounds and final sounds including the tones. Click on a row to hear how it sounds!</p>
			<h3>Initials</h3>
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
			<h3>Finals</h3>
			<div className='row-diagram'>
				{finals.map((ex, i) => {
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
				})}
			</div>
			<div className='list-divider'></div>
			<h2>Tones</h2>
		</div>
	);
		
}
export default DictionaryHelp;
