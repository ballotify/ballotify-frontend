import React, { PropTypes } from 'react';
import Navigation from './Navigation';


class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="app container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
