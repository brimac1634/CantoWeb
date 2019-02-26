import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { updateUser } from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(updateUser)

ReactDOM.render((
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	), document.getElementById('root'));

serviceWorker.unregister();
