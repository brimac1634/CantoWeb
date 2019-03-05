import React from 'react';
import './DictionaryHelp.css';
import EntryRow from '../EntriesList/EntryRow/EntryRow';

const DictionaryHelp = () => {

	const demoEntry = {
		entryID: 0,
		cantoword: '嗜好',
		classifier: '個 go3',
		jyutping: 'si3 hou3',
		englishword: 'hobby',
		mandarinword: '爱好',
		cantosentence: '我嘅嗜好係可以周圍去旅行。',
		jyutpingsentence: 'ngo5 ge3 si3 ho3 hai6 ho2 yi5 zau1 wai4 heoi3 leoi5 hang4.',
		englishsentence: 'My hobby is travelling on the weekend.',
	}

	return (
		<div className='dict-help'>
			<h3>How do I use this dictionary?</h3>
			<div className='list-divider'></div>
			<p>This dictionary is designed around spoken Cantonese, and the day to day vocabulary that is regularly spoken among locals. You can start using the dictionary by navigating to the search page and using the search bar. The search bar can accept English, Mandarin, Jyutping, or Cantonese, making it easy to find translations. Once your search returns matching results, you will see translations like in the diagram below. Hover over the different sections of the key below to see what it all is!</p>
			<div className='row-diagram'>
				<EntryRow 
					entry={demoEntry} 
					isDemo={true} 
					className='demo-row'
				/>
			</div>  
		</div>
	);
		
}
export default DictionaryHelp;
