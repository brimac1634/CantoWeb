import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import WordOfTheDay from './WordOfTheDay/WordOfTheDay';
import Learn from './Learn/Learn';

const MainView = ({ userID }) => {
	return (
		<div className='main-view'>
			<Switch>
				<Route 
					exact path='/' 
					render={(props) => <Search {...props} userID={userID}/>}
				/>
				<Route 
					path='/Favorites' 
					render={(props) => <Favorites {...props} userID={userID}/>}
				/>
				<Route 
					path='/WordOfTheDay' 
					render={(props) => <WordOfTheDay {...props} userID={userID}/>}
				/>
				<Route 
					path='/Learn' 
					render={(props) => <Learn {...props} userID={userID}/>}
				/>
			</Switch>
		</div>
	);
}

export default MainView;