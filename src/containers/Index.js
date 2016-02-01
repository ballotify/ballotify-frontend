import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as NewQuestionActions from '../actions/newQuestion';
import * as AuthActions from '../actions/auth';
import * as currentQuestionActions from '../actions/currentQuestion';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import QuestionForm from '../components/QuestionForm';

class Index extends Component {
    render() {
        const { auth, newQuestion, actions } = this.props;

        return (
            <QuestionForm newQuestion={newQuestion} auth={auth} actions={actions} />
        );
    }
}

Index.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    newQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.get('auth'),
        newQuestion: state.get('newQuestion')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, AuthActions, NewQuestionActions, currentQuestionActions), dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
