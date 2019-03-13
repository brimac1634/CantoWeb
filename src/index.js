import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { rootReducer } from './rootReducer';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render((
	<Provider store={store}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>
	), document.getElementById('root'));

serviceWorker.unregister();
