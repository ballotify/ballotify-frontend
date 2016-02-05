import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';


export default class ChoiceRow extends Component {
    handleChange(e) {
        const {actions, question, choice} = this.props;
        const isChecked = question.get('votes').includes(choice.get('id'));

        if (question.get('isMultiple')) {
            if (isChecked) {
                actions.removeQuestionVote(choice.get('id'));
            } else {
                actions.addQuestionVote(choice.get('id'));
            }
        } else {
            if (!isChecked) {
                actions.setQuestionVote(choice.get('id'));
            }
        }
    }

    render() {
        const {question, choice} = this.props;
        const isChecked = question.get('votes').includes(choice.get('id'));
        const inputClasses = classNames('c-input', {
            'c-checkbox': question.get('isMultiple'),
            'c-radio': !question.get('isMultiple'),
            'active': isChecked
        });

        let inputBlock;
        if (question.get('isMultiple')) {
            inputBlock = (
                <label htmlFor={choice.get('id')} className={inputClasses}>
                    <input type="checkbox" name="choice" id={choice.get('id')} value={choice.get('id')}
                        defaultChecked={isChecked}
                        onChange={this.handleChange.bind(this)} />
                    <span className="c-indicator"></span>
                    <span className="choice-title">{choice.get('title')}</span>
                </label>);
        } else {
            inputBlock = (
                <label htmlFor={choice.get('id')} className={inputClasses}>
                    <input type="radio" name="choice" id={choice.get('id')} value={choice.get('id')}
                        defaultChecked={isChecked}
                        onChange={this.handleChange.bind(this)} />
                    <span className="c-indicator"></span>
                    <span className="choice-title">{choice.get('title')}</span>
                </label>);
        }

        return (
            <li className="list-group-item">{inputBlock}</li>
        );
    }
}

ChoiceRow.propTypes = {
    actions: PropTypes.object.isRequired,
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
