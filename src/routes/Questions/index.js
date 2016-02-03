import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Link } from 'react-router';
import * as QuestionsActions from '../../actions/questions';


export default class Questions extends React.Component {
    componentWillMount() {
        const { actions, questions } = this.props;
        actions.getQuestions();
    }

    render() {
        const { questions } = this.props;

        let element;

        if (questions.get('isPending')) {
            element = <p>Loading...</p>;
        } else if (questions.get('isFulfilled')) {
            element = (
                <div>
                    {questions.get('data').map(question =>
                      <div key={question.slug} className="list-group-item">
                          <Link to={`/questions/${question.slug}`}>{question.title}</Link>
                      </div>
                    )}
                </div>
            );
        }

        return (
            <div>
                {element}
            </div>
        );
    }
}

Questions.propTypes = {
    actions: PropTypes.object.isRequired,
    questions: PropTypes.instanceOf(Immutable.Map).isRequired
};

function mapStateToProps(state) {
    return {
        questions: state.get('questions')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(QuestionsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Questions);
