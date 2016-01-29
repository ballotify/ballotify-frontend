import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './containers/App';
import Index from './containers/Index';
import NoMatch from './containers/NoMatch';
import configureStore from './store/configureStore';
import './styles/styles.sass';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="*" component={NoMatch} />
          </Route>
        </Router>
    </Provider>, document.getElementById('app')
);
