import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './containers/App';
import Home from './routes/Home';
import Questions from './routes/Questions';
import QuestionDetails from './routes/QuestionDetails';
import QuestionResults from './routes/QuestionResults';
import NoMatch from './containers/NoMatch';
import configureStore from './store/configureStore';
import { loginSuccess } from './actions/auth';
import './styles/styles.scss';

const store = configureStore();

let token = localStorage.getItem('jwtToken');
if (token !== null) {
    store.dispatch(loginSuccess(token));
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="questions" component={Questions} />
            <Route path="questions/:slug" component={QuestionDetails} />
            <Route path="questions/:slug/results" component={QuestionResults} />
            <Route path="*" component={NoMatch} />
          </Route>
        </Router>
    </Provider>, document.getElementById('app')
);
