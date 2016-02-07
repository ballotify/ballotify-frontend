import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Immutable from 'immutable';
import ChoiceRow from './ChoiceRow';
import * as currentQuestionActions from '../../actions/currentQuestion';
import * as AuthActions from '../../actions/auth';


export default class QuestionDetails extends React.Component {
    componentWillMount() {
        const { actions, params, currentQuestion } = this.props;

        if (currentQuestion.get('slug') != params.slug) {
            actions.getQuestion(params.slug);
        }
    }

    facebookLogin() {
        // TODO: How to do it DRY? facebookLogin is the same in different components...
        const { actions } = this.props;
        FB.login((response) => {
            if (response.authResponse) {
                actions.facebookLogin(response.authResponse.accessToken);
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    handleVote() {
        const { actions, currentQuestion } = this.props;

        // TODO: Add error handling in case if there is no selected choices
        actions.voteOnQuestion(currentQuestion);
    }

    render() {
        const { actions, currentQuestion, auth } = this.props;

        let questionBlock;
        if (currentQuestion.get('isPending')) {
            questionBlock = (<p>Loading...</p>);

        } else if (currentQuestion.get('isFulfilled')) {
            let voteButton;
            if (auth.get('isAuthenticated')) {
                voteButton = (
                    <button type="button" className="btn btn-success-outline btn-sm"
                        onClick={this.handleVote.bind(this)}>Vote</button>
                );
            } else {
                if (auth.get('isPending')) {
                    voteButton = (<p>Loading...</p>);
                } else {
                    voteButton = (
                        <button type="button" className="btn btn-primary-outline btn-sm"
                            onClick={this.facebookLogin.bind(this)}>Login with Facebook</button>
                    );
                }
            }

            questionBlock = (
                <div className="col-sm-12">
                    <p>{currentQuestion.get('title')}</p>
                    <ul className="list-group">
                        {currentQuestion.get('choices').map(
                            choice => <ChoiceRow key={choice.get('id')} choice={choice} question={currentQuestion} actions={actions} />
                        )}
                    </ul>
                    <div className="vote-button">
                        {voteButton}
                    </div>
                </div>
            );
        }

        return (
            <div className="row question-details">
                {questionBlock}
            </div>
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
        actions: bindActionCreators(Object.assign({}, AuthActions, currentQuestionActions), dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDetails);
