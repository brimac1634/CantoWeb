import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from '../Search/Search';
import WordOfTheDay from '../WordOfTheDay/WordOfTheDay';
import Learn from '../Learn/Learn';
import { routes } from '../../Routing/constants';

const MainView = () => {
	const { SEARCH, WORD_OF_THE_DAY, LEARN } = routes;
	return (
		<div className='main-view' style={{position: 'absolute'}}>
			<Switch>
				<Route 
					path={SEARCH} 
					component={Search}
				/>
				<Route 
					path={WORD_OF_THE_DAY} 
					component={WordOfTheDay}
				/>
				<Route 
					path={LEARN} 
					component={Learn}
				/>
				<Redirect 
					to={SEARCH} 
				/>
			</Switch>
		</div>
	);
}

export default MainView;