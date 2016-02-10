import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import * as AuthActions from '../actions/auth';
import { FACEBOOK_ID } from '../constants/globals';
import Navigation from './Navigation';

class App extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            fbLoaded: false
        };
    }

    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId   : FACEBOOK_ID,
                status  : true,
                xfbml   : true,
                version : 'v2.5'
            });

            FB.getLoginStatus((response) => {
                this.authenticate(response);
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    authenticate(fbResponse) {
        const {actions} = this.props;

        this.setState({'fbLoaded': true});

        if (fbResponse.status == "connected") {
            let token = localStorage.getItem('jwtToken');
            if (token !== null) {
                actions.loginSuccess(token);
            }
        }
    }

    render() {
        const { auth, actions } = this.props;

        let app;

        if (this.state.fbLoaded) {
            app = (
                <div className="app container">
                    {this.props.children}
                </div>
            );
        } else {
            app = (
                <div className="loader-wrapper">
                    <div className="la-ball-fall la-dark la-2x loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
        }

        return (
            <div className="full-height">
                <Navigation auth={auth} actions={actions} />
                {app}
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    children: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.get('auth')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
