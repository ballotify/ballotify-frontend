import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './containers/App';
import Index from './containers/Index';
import Questions from './containers/Questions';
import QuestionDetails from './containers/QuestionDetails';
import NoMatch from './containers/NoMatch';
import configureStore from './store/configureStore';
import { loginSuccess } from './actions/auth';
import './styles/styles.sass';

const store = configureStore();

let token = localStorage.getItem('jwtToken');
if (token !== null) {
    store.dispatch(loginSuccess(token));
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="questions" component={Questions} />
            <Route path="questions/:slug" component={QuestionDetails} />
            <Route path="*" component={NoMatch} />
          </Route>
        </Router>
    </Provider>, document.getElementById('app')
);
