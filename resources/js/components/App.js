import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import Store from '../Store/configureStore';
import Home from "./home/Home";
import Admin from "./admin/Admin";


class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
