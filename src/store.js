import createHistory from 'history/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import createRootReducer from './rootReducer';

export const history = createHistory()
const logger = createLogger();

const initialState = {}
const middleware = [
  logger,
  routerMiddleware(history)
]

const store = createStore(
  createRootReducer(history),
  initialState,
  compose(
    applyMiddleware(...middleware)
  ),
)

export default store