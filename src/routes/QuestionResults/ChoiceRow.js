import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import Vote from './Vote';


export default class ChoiceRow extends Component {
    render() {
        const { choice } = this.props;

        return (
            <li className="list-group-item choice-row">
                <div className="choice-title">
                    {choice.get('title')}
                </div>
                <div className="votes">
                    <ul className="pictures">
                        {choice.get('voteChoices').map(vote =>
                            <Vote key={vote.getIn(['user', 'facebookId'])} choice={choice} vote={vote} />
                        )}
                    </ul>
                    <span className="votes-count">{choice.get('votesCount')}</span>
                </div>
            </li>
        );
    }
}

ChoiceRow.propTypes = {
    actions: PropTypes.object.isRequired,
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    question: PropTypes.instanceOf(Immutable.Map).isRequired
};
