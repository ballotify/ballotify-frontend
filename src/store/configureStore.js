import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import Immutable from 'immutable';

export default function configureStore() {
    const initialState = Immutable.fromJS({});
    const reduxRouterMiddleware = syncHistory(browserHistory);

    const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunk, reduxRouterMiddleware, promiseMiddleware()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    reduxRouterMiddleware.listenForReplays(store, (state) => state.get('route').location);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
