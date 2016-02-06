import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';


export default class ChoiceRow extends Component {
    render() {
        const { choice } = this.props;

        return (
            <li className="list-group-item">
                <div className="choice-title">
                    {choice.get('title')}
                </div>
                <span className="votes-count">{choice.get('votesCount')}</span>
            </li>
        );
    }
}

ChoiceRow.propTypes = {
    actions: PropTypes.object.isRequired,
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
