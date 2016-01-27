import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';


export default class QuestionChoice extends Component {
    constructor (props, context) {
        super(props, context);

        const { choice } = this.props;

        this.state = {
            title: choice.get('title'),
            editing: false
        };
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.refs.choiceInput.focus();
        }
    }

    onFocus(e) {
      e.target.setSelectionRange(this.state.title.length, this.state.title.length);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleDelete() {
        const { actions, choice } = this.props;
        actions.deleteQuestionChoice(choice.get('id'));
    }

    handleEdit() {
        const { actions, choice } = this.props;
        this.setState({
            editing: true
        });
    }

    handleCancel() {
        const { actions, choice } = this.props;
        this.setState({
            editing: false
        });
    }

    handleSave(e) {
        const { actions, choice } = this.props;
        const title = this.state.title.trim();

        if (title) {
            actions.editQuestionChoice(choice.get('id'), {
                title: title
            });
            this.setState({
                editing: false
            });
        } else {
            this.handleDelete();
        }
    }

    handleKeyDown(e) {
        if (e.which === 13) {
          this.handleSave();
        } else if (e.which === 27) {
          this.handleCancel();
        }
    }

    render() {
        const { choice } = this.props;
        let row;

        if (this.state.editing) {
            row = (
                <div className="list-group-item form-inline choice choice-input">
                    <input type="text" className="form-control" ref="choiceInput"
                        defaultValue={choice.get('title')}
                        onChange={this.handleTitleChange.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        onKeyDown={this.handleKeyDown.bind(this)} />
                    <div>
                        <button type="submit" className="btn btn-success btn-sm"
                            onClick={this.handleSave.bind(this)}>Save</button>
                        <button type="submit" className="btn btn-danger btn-sm"
                            onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>
                </div>
            );
        } else {
            row = (
                <a className="list-group-item choice choice-title">
                    {choice.get('title')}
                    <div>
                        <button type="button" className="btn btn-warning-outline btn-sm"
                            onClick={this.handleEdit.bind(this)}>Edit</button>
                        <button type="button" className="btn btn-danger-outline btn-sm"
                            onClick={this.handleDelete.bind(this)}>Remove</button>
                    </div>
                </a>
            );
        }

        return row;
    }
}

QuestionChoice.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    actions: PropTypes.object.isRequired
};
