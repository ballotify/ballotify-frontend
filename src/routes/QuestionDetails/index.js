import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import ChoiceRow from './ChoiceRow';
import * as currentQuestionActions from '../../actions/currentQuestion';


export default class QuestionDetails extends React.Component {
    componentWillMount() {
        const { actions, params, currentQuestion } = this.props;

        if (currentQuestion.get('slug') != params.slug) {
            actions.getQuestion(params.slug);
        }
    }

    render() {
        const { currentQuestion } = this.props;

        let questionBlock;
        if (currentQuestion.get('isPending')) {
            questionBlock = (<p>Loading...</p>);

        } else if (currentQuestion.get('isFulfilled')) {
            questionBlock = (<div>
                <p>{currentQuestion.get('title')}</p>
                <ul>
                    {currentQuestion.get('choices').map(
                        choice => <ChoiceRow key={choice.get('id')} choice={choice} question={currentQuestion} />
                    )}
                </ul>
            </div>);
        }

        return (
            <div>{questionBlock}</div>
        );
    }
}

QuestionDetails.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    currentQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.get('auth'),
        currentQuestion: state.get('currentQuestion')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(currentQuestionActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDetails);
