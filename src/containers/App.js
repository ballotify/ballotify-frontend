import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import * as AuthActions from '../actions/auth';
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
                appId   : '107790869310294',
                status  : true,
                xfbml   : true,
                version : 'v2.5'
            });

            FB.getLoginStatus((response) => {
                this.runFbInitCriticalCode();
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

    runFbInitCriticalCode() {
        this.setState({'fbLoaded': true});
    }

    render() {
        const { auth, actions } = this.props;

        let app;

        if (this.state.fbLoaded) {
            app = (
                <div>
                    <Navigation auth={auth} actions={actions} />
                    <div className="app container">
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            app = (<p>Loading</p>);
        }

        return app;
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
