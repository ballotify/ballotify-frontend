import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import Immutable from 'immutable';

export default function configureStore() {
    const initialState = Immutable.fromJS({});

    const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(promiseMiddleware()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
