import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';


export default class ChoiceRow extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            isSelected: false
        };
    }

    handleChange(e) {
        this.setState({
            isSelected: e.target.checked
        });
    }

    render() {
        const {question, choice} = this.props;

        // TODO: Change to use global store.currentQuestion.vote.choices.findIndex (item) => item.get('id') == choice.get('id')
        // and proper actions
        const inputClasses = classNames({
            'active': this.state.isSelected
        });

        let inputBlock;
        if (question.get('isMultiple')) {
            inputBlock = (
                <label htmlFor={choice.get('id')} className={inputClasses}>
                    <input type="checkbox" name="choice" id={choice.get('id')} value={choice.get('id')}
                        onChange={this.handleChange.bind(this)} />
                    <span className="choice-title">{choice.get('title')}</span>
                </label>);
        } else {
            inputBlock = (
                <label htmlFor={choice.get('id')} className={inputClasses}>
                    <input type="radio" name="choice" id={choice.get('id')} value={choice.get('id')}
                        onChange={this.handleChange.bind(this)} />
                    <span className="choice-title">{choice.get('title')}</span>
                </label>);
        }

        return (
            <li className="list-group-item">{inputBlock}</li>
        );
    }
}

ChoiceRow.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
