import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import ChoiceRow from './ChoiceRow';


export default class QuestionForm extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            error: null
        };
    }

    handleTitleChange(e) {
        const { actions } = this.props;
        actions.editQuestionTitle(e.target.value);
    }

    handleSubmitTitle(e) {
        const value = e.target.value.trim();

        if (e.which === 13 && value.length > 0) {
            this.refs.choice.focus();
        }
    }

    handleSubmitChoice(e) {
        const { actions } = this.props;
        const value = e.target.value.trim();

        if (e.which === 13 && value.length > 0) {
            actions.addQuestionChoice(value);
            e.target.value = null;
            this.setState({ error: null });
        }
    }

    toggleOption(option) {
        const { actions } = this.props;
        actions.toggleQuestionOption(option);
    }

    handleCreateQuestion() {
        const { actions, newQuestion } = this.props;

        let error;
        if (!newQuestion.get('title')) {
            this.setState({
                error: "Would you like to ask something first?"
            });
            this.refs.question.focus();
        } else if (newQuestion.get('choices').count() < 2) {
            this.setState({
                error: "Too small amount of choices, buddy..."
            });
            this.refs.choice.focus();
        } else {
            actions.createQuestion(newQuestion.toJS());
        }
    }

    facebookLogin() {
        const { actions } = this.props;
        FB.login((response) => {
            if (response.authResponse) {
                actions.facebookLogin(response.authResponse.accessToken);
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    render() {
        const { actions, auth, newQuestion } = this.props;

        let createQuestionBlock;

        if (auth.get('isAuthenticated')) {
            createQuestionBlock = (
                <button type="button" className="btn btn-success-outline btn-sm"
                    onClick={this.handleCreateQuestion.bind(this)}>Ask Question</button>
            );
        } else {
            if (auth.get('isPending')) {
                createQuestionBlock = (<p>Loading...</p>);
            } else {
                createQuestionBlock = (
                    <button type="button" className="btn btn-primary-outline btn-sm"
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
                            onChange={this.handleTitleChange.bind(this)}
                            onKeyDown={this.handleSubmitTitle.bind(this)} />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="choice">Enter your choice:</label>
                        <input className="form-control" id="choice" ref="choice" placeholder="Something"
                            onKeyDown={this.handleSubmitChoice.bind(this)} />
                    </fieldset>
                </form>
                <div className="list-group">
                    {newQuestion.get('choices').map(choice =>
                      <ChoiceRow key={choice.get('id')} actions={actions} choice={choice} />
                    )}
                </div>
                <label className="c-input c-checkbox">
                    <input type="checkbox" name="choice"
                        onChange={() => this.toggleOption('isMultiple')} />
                    <span className="c-indicator"></span>
                    <span className="choice-title">Multiple answers allowed</span>
                </label>
                <label className="c-input c-checkbox">
                    <input type="checkbox" name="choice"
                        onChange={() => this.toggleOption('isRandomized')} />
                    <span className="c-indicator"></span>
                    <span className="choice-title">Randomize order</span>
                </label>
                <label className="c-input c-checkbox">
                    <input type="checkbox" name="choice"
                        onChange={() => this.toggleOption('isPrivate')} />
                    <span className="c-indicator"></span>
                    <span className="choice-title">Share with link only</span>
                </label>
                <div className="error">
                    {this.state.error}
                </div>
                <div className="create-question">
                    {createQuestionBlock}
                </div>
            </div>
        );
    }
}

QuestionForm.propTypes = {
    auth: PropTypes.instanceOf(Immutable.Map).isRequired,
    newQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
