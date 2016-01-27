import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuestionForm from '../components/QuestionForm';
import * as NewQuestionActions from '../actions/newQuestion';

class App extends React.Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.addQuestionChoice('Jora');
        actions.addQuestionChoice('Valera');
        actions.editQuestionChoice(1, {
            title: 'Vani4ka'
        });
    }

    render() {
        const { newQuestion, actions } = this.props;

        return (
            <QuestionForm newQuestion={newQuestion} actions={actions} />
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    newQuestion: PropTypes.object.isRequired
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
)(App);
