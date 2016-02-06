import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import * as AuthActions from '../actions/auth';
import Navigation from './Navigation';


class App extends React.Component {
    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId       : '107790869310294',
                xfbml       : true,
                version     : 'v2.5'
            });
        };
    }

    render() {
        const { auth, actions } = this.props;

        return (
            <div>
                <Navigation auth={auth} actions={actions} />
                <div className="app container">
                    {this.props.children}
                </div>
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
