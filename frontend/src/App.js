import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home } from 'pages';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" component={Home}/>
            </div>
        );
    }
}

export default App;