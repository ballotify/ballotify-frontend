import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as NewQuestionActions from '../actions/newQuestion';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import QuestionForm from '../components/QuestionForm';

class Index extends Component {
    render() {
        const { newQuestion, actions } = this.props;

        return (
            <QuestionForm newQuestion={newQuestion} actions={actions} />
        );
    }
}

Index.propTypes = {
    newQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        newQuestion: state.get('newQuestion')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(NewQuestionActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
