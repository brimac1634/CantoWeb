import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import createRootReducer from './rootReducer'

export const history = createBrowserHistory()
const logger = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        logger,
        routerMiddleware(history)
      ),
    ),
  )

  return store
}