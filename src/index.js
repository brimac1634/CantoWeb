import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './rootReducer';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render((
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	), document.getElementById('root'));

serviceWorker.unregister();
