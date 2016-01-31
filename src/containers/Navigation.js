import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import Immutable from 'immutable';


export default class Navigation extends React.Component {
    handleLogout() {
        const { actions } = this.props;
        actions.logout();
    }

    handleLogin() {
        const { actions } = this.props;
        console.log("TODO: FB SDK login first.");
    }

    render() {
        const { auth } = this.props;

        let authBlock;
        if (auth.get('isAuthenticated')) {
            authBlock = (<button className="btn btn-primary-outline pull-xs-right" type="submit"
                            onClick={this.handleLogout.bind(this)}>Logout</button>);
        } else {
            authBlock = (<button className="btn btn-primary-outline pull-xs-right" type="submit"
                            onClick={this.handleLogin.bind(this)}>Login</button>);
        }

        return (
            <div className="navbar navbar-light bg-faded navbar-static-top">
                <ui className="nav navbar-nav">
                    <li className="nav-item"><IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink></li>
                    <li className="nav-item"><Link to="/questions" className="nav-link" activeClassName="active">Questions</Link></li>
                </ui>
                {authBlock}
            </div>
        );
    }
}

Navigation.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
