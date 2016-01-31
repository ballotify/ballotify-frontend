import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import QuestionChoice from '../components/QuestionChoice';


export default class QuestionForm extends Component {
    handleTitleChange(e) {
        const { actions } = this.props;
        actions.editQuestionTitle(e.target.value);
    }

    handleSubmitChoice(e) {
        const { actions } = this.props;
        const value = e.target.value.trim();

        if (e.which === 13 && value.length > 0) {
            actions.addQuestionChoice(value);
            e.target.value = null;
        }
    }

    facebookLogin() {
        const { actions } = this.props;
        console.log("Facebook API going to be called here!");
    }

    render() {
        const { actions, auth, newQuestion } = this.props;

        let createQuestionBlock;

        if (auth.get('isAuthenticated')) {
            createQuestionBlock = (<p>TODO: Create question button is going to be here!</p>);
        } else {
            if (auth.get('isPending')) {
                createQuestionBlock = (<p>Loading...</p>);
            } else {
                createQuestionBlock = (
                    <button type="button" className="btn btn-success-outline btn-sm"
                        onClick={this.facebookLogin.bind(this)}>Login with Facebook</button>
                );
            }
        }

        return (
            <div className="question-form">
                <form>
                    <fieldset className="form-group">
                        <label htmlFor="question">Enter your question:</label>
                        <input className="form-control" id="question" ref="question" placeholder="What?"
                            onChange={this.handleTitleChange.bind(this)} />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="choice">Enter your choice:</label>
                        <input className="form-control" id="choice" ref="choice" placeholder="Something"
                            onKeyDown={this.handleSubmitChoice.bind(this)} />
                    </fieldset>
                </form>
                <div className="list-group">
                    {newQuestion.get('choices').map(choice =>
                      <QuestionChoice key={choice.get('id')} actions={actions} choice={choice} />
                    )}
                </div>
                {createQuestionBlock}
            </div>
        );
    }
}

QuestionForm.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    newQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
