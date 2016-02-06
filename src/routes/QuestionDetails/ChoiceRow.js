import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';


export default class ChoiceRow extends Component {
    handleCheckboxChange(e) {
        const {actions, question, choice} = this.props;

        if (this.isChecked()) {
            actions.removeQuestionVote(choice.get('id'));
        } else {
            actions.addQuestionVote(choice.get('id'));
        }
    }

    handleRadioChange(e) {
        const {actions, question, choice} = this.props;

        if (!this.isChecked()) {
            actions.setQuestionVote(choice.get('id'));
        }
    }

    isChecked() {
        const {question, choice} = this.props;
        return question.getIn(['currentVote', 'choices']).find((item) => item.choice == choice.get('id'));
    }

    render() {
        const {question, choice} = this.props;
        const isChecked = this.isChecked();
        const inputClasses = classNames('c-input', {
            'c-checkbox': question.get('isMultiple'),
            'c-radio': !question.get('isMultiple'),
            'active': isChecked
        });

        let inputBlock;
        if (question.get('isMultiple')) {
            inputBlock = (
                <input type="checkbox" name="choice" id={choice.get('id')} value={choice.get('id')}
                    defaultChecked={isChecked}
                    onChange={this.handleCheckboxChange.bind(this)} />
            );
        } else {
            inputBlock = (
                <input type="radio" name="choice" id={choice.get('id')} value={choice.get('id')}
                    defaultChecked={isChecked}
                    onChange={this.handleRadioChange.bind(this)} />
            );
        }

        return (
            <li className="list-group-item">
                <label htmlFor={choice.get('id')} className={inputClasses}>
                    {inputBlock}
                    <span className="c-indicator"></span>
                    <span className="choice-title">{choice.get('title')}</span>
                </label>
            </li>
        );
    }
}

ChoiceRow.propTypes = {
    actions: PropTypes.object.isRequired,
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
