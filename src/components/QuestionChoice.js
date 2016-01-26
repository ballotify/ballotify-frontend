import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';


export default class QuestionChoice extends Component {
    handleDeleteChoice(choiceId) {
        const { actions } = this.props;
        actions.deleteQuestionChoice(choiceId);
    }

    render() {
        const { choice } = this.props;

        return (
            <a className="list-group-item">
                {choice.get('title')}
                <button type="button" className="btn btn-danger-outline btn-sm"
                    onClick={() => this.handleDeleteChoice(choice.get('id'))}>Remove</button>
            </a>
        );
    }
}



QuestionChoice.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
