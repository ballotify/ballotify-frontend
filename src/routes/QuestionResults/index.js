import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import ChoiceRow from './ChoiceRow';
import * as currentQuestionActions from '../../actions/currentQuestion';
import * as AuthActions from '../../actions/auth';


export default class QuestionResults extends React.Component {
    componentWillMount() {
        const { actions, params, currentQuestion } = this.props;

        actions.getQuestion(params.slug, {
            include: 'votes'
        });
    }

    render() {
        const { actions, currentQuestion, auth } = this.props;

        let questionBlock;
        if (currentQuestion.get('isPending')) {
            questionBlock = (<p>Loading...</p>);

        } else if (currentQuestion.get('isFulfilled')) {
            questionBlock = (
                <div className="col-sm-12">
                    <p>{currentQuestion.get('title')}</p>
                    <ul className="list-group">
                        {currentQuestion.get('choices').map(
                            choice => <ChoiceRow key={choice.get('id')} choice={choice} question={currentQuestion} actions={actions} />
                        )}
                    </ul>
                </div>
            );
        }

        return (
            <div className="row question-results">
                {questionBlock}
            </div>
        );
    }
}

QuestionResults.propTypes = {
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
        actions: bindActionCreators(Object.assign({}, AuthActions, currentQuestionActions), dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionResults);
