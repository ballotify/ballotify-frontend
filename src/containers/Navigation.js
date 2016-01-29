import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';


export default class Navigation extends React.Component {
    render() {
        return (
            <div className="navbar navbar-light bg-faded navbar-static-top">
                <ui className="nav navbar-nav">
                    <li className="nav-item"><IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink></li>
                    <li className="nav-item"><Link to="/about" className="nav-link" activeClassName="active">About</Link></li>
                </ui>
            </div>
        );
    }
}
