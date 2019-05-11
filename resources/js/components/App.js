import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Fidman pro</h1>
                    <Switch>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
