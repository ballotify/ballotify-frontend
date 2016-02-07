import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';


export default class Vote extends Component {
    render() {
        const { vote, choice } = this.props;
        const userUrl = `http://graph.facebook.com/${vote.getIn(['user', 'facebookId'])}/picture?width=60&height=60`;

        return (
            <li className="tooltip-wrapper">
                <img className="img-rounded" src={userUrl} />
                <div className="tooltip">
                    <div>{vote.getIn(['user', 'name'])}</div>
                </div>
            </li>
        );
    }
}

Vote.propTypes = {
    choice: PropTypes.instanceOf(Immutable.Map).isRequired,
    vote: PropTypes.instanceOf(Immutable.Map).isRequired
};
