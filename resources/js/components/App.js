import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import Store from '../Store/configureStore';
import Home from "./home/Home";
import Admin from "./admin/Admin";
import axio from 'axios';
import Login from "./admin/login/Login";
import AdminRoute from "./admin/AdminRoute";
import LoginRoute from "./admin/LoginRoute";
import ResetFormParent from "./admin/login/ResetFormParent";
import PageNotFound from "./404/PageNotFound";

const redirectTo = '/admin';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            token: '',
            user: undefined,
            loginMessage: '',
            connecting: false,
        };
    }

    componentWillMount() {
        //axio.post('api/details',)
        //    .then(rep => console.log(rep))
        //    .catch(error => console.log(error));

        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            if (AppState.loggedIn) axio.defaults.headers.common['Authorization'] = 'Bearer ' + AppState.token;
            this.setState({ loggedIn: AppState.loggedIn, user: AppState.user, token: AppState.token });
        }
    }

    _handleLoginClick(email, password){

        this.setState({
            connecting: true,
        });

        axio.post('api/login',{
            email: email,
            password: password
        })
            .then(rep => {
                const data = rep.data.success;
                if (data) {
                    let appState = {
                        loggedIn: true,
                        token: data.token,
                        user: data.user,
                    };

                    axio.defaults.headers.common['Authorization'] = 'Bearer ' + appState.token;
                    localStorage["appState"] = JSON.stringify(appState);

                    this.setState({
                        ...appState,
                        loginMessage: '',
                        connecting: false,
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loginMessage: "Vous avez entré un email ou un mot de passe invalide",
                    connecting: false,
                })
            });
    }

    _handleLogout(e){
        if (e) e.preventDefault();
        let appState = {
            loggedIn: false,
            token: '',
            user: undefined
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    }

    _handleLoginAlertDismiss(e){
        e.preventDefault();
        this.setState({
            loginMessage: ''
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    exact
                    path="/reset"
                    component={ResetFormParent}
                />
                <AdminRoute
                    loggedIn={this.state.loggedIn}
                    path="/admin"
                    component={Admin}
                    onLogout={this._handleLogout.bind(this)}
                    logout={this._handleLogout.bind(this)}
                />
                <LoginRoute
                    loggedIn={this.state.loggedIn}
                    connecting={this.state.connecting}
                    path="/login"
                    component={Login}
                    onLogin={this._handleLoginClick.bind(this)}
                    loginMessage={this.state.loginMessage}
                    onAlertDismiss={this._handleLoginAlertDismiss.bind(this)}
                />

                <Route
                    path="*"
                    component={PageNotFound}
                />
            </Switch>
        );
    }

}

const AppContainer = withRouter(props => <App {...props} />);


ReactDOM.render((
    <Provider store={Store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>), document.getElementById('app'));
