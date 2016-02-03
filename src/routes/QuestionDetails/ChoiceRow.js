import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';


export default class ChoiceRow extends Component {
    render() {
        const {question, choice} = this.props;

        let inputBlock;
        if (question.get('isMultiple')) {
            inputBlock = (<span>[]</span>);
        } else {
            inputBlock = (<span>o</span>);
        }

        return (
            <li>
                {inputBlock}
                <span> {choice.get('title')}</span>
            </li>
        );
    }
}

ChoiceRow.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
