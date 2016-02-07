import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';


export default class Vote extends Component {
    render() {
        const { vote, choice } = this.props;
        const userUrl = `http://graph.facebook.com/${vote.getIn(['user', 'facebookId'])}/picture?width=60&height=60`;

        return (
            <li>
                <img className="img-rounded" src={userUrl} />
            </li>
        );
    }
}

Vote.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    vote: PropTypes.instanceOf(Immutable.Map).isRequired
};
