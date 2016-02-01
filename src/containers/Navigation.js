import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import Immutable from 'immutable';


export default class Navigation extends React.Component {
    handleLogout() {
        const { actions } = this.props;
        actions.logout();
    }

    facebookLogin() {
        const { actions } = this.props;

        FB.login((response) => {
            if (response.authResponse) {
                actions.facebookLogin(response.authResponse.accessToken);
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    render() {
        const { auth } = this.props;

        let authBlock;
        if (auth.get('isAuthenticated')) {
            authBlock = (<button className="btn btn-primary-outline pull-xs-right" type="submit"
                            onClick={this.handleLogout.bind(this)}>Logout</button>);
        } else {
            authBlock = (<button className="btn btn-primary-outline pull-xs-right" type="submit"
                            onClick={this.facebookLogin.bind(this)}>Login with Facebook</button>);
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
