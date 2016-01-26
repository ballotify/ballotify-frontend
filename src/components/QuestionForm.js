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

    render() {
        const { actions, newQuestion } = this.props;

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
            </div>
        );
    }
}

QuestionForm.propTypes = {
    newQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
